#include "SoilMoistureMonitor_ide.h"		// Additional Header
#include "driver_gpio.h"

#undef __assert
#define __assert    __assert_print

#define SOIL_MOISTURE_MONITOR_PANID 1198
#define SOIL_MOISTURE_MONITOR_GW_ADDR16  0x2ef0

#define DEBUGMODE_PIN   2
#define SENSOR_PWRPIN   4
#define SENSOR_AIN      19

void Sleep(void);
int measureSoilMoisture(void);

Packet *packet;
Command *iCmd;
Notice *iNotice;
int sleepHourCounter = 3600000;
int intervalInHour = 1;
char sensorData[300];

void setup() {
  // put your setup code here, to run once:

  // Enable the serial interface.
  Serial.begin(115200);

  // Turn off the blue and green LEDs.
  digitalWrite(25,HIGH);
  digitalWrite(26,HIGH);

  // Set pin mode as for output
  pinMode(SENSOR_PWRPIN, OUTPUT);

  pinMode(DEBUGMODE_PIN, INPUT_PULLUP);
  if (digitalRead(DEBUGMODE_PIN) == 0) {
    Serial.println("Debug mode");
    sleepHourCounter = 5000;
  }

  // Initialize the radio.
  Wireless.init();

  packet = Packet_new();
}

void loop() {
  Serial.println("loop\n");
  Sleep();
  
  Packet_initialize(packet);
  if (Wireless.listen(packet) == 0) {
    const char *param;
    if (Packet_getType(packet) != COMMAND) return;
    iCmd = (Command *)Packet_getInterface(packet);
    if (iCmd->getCommand(packet) != 0x80) return;
    param = iCmd->getCommandParam(packet);
    intervalInHour = strtol(param, NULL, 10);
  }

  {
    int value;

    value = measureSoilMoisture();
    Print.init(sensorData, sizeof(sensorData));
    Print.p("soilmoisture:");
    Print.l(value, 10);

    Serial.println(sensorData);
    Serial.println_long(value, DEC);

    Packet_initialize(packet);
    Packet_setType(packet, NOTICE);
    iNotice = (Notice *)Packet_getInterface(packet);
    iNotice->setNotice(packet, sensorData);
    Wireless.send(packet, SOIL_MOISTURE_MONITOR_PANID, SOIL_MOISTURE_MONITOR_GW_ADDR16);
  }
}

void Sleep(void) {
  int i;

  // Turn off the radio.
  Wireless.end();

  Serial.println("I'm so sleepy.");
  Serial.flush();
  delay(200);

  // Turn off the power source for the sensor.
  digitalWrite(SENSOR_PWRPIN, LOW);
  
  // Close the serial port.
  Serial.end();

  drv_digitalWrite(11,HIGH); // PWR LED OFF
  sleep(sleepHourCounter * intervalInHour);
  drv_digitalWrite(11,LOW);  // PWR LED ON

  // here after waking from sleep

  // Open the serial port.
  Serial.begin(115200);
  Serial.println("Mega shakeeeeen!");

  // Turn on the power source
  digitalWrite(SENSOR_PWRPIN, HIGH);
  delay(1000); // Delay until the voltage level of the power source become stable.

  // Turn on the radio.
  Wireless.begin(36, SOIL_MOISTURE_MONITOR_PANID, SUBGHZ_100KBPS, SUBGHZ_PWR_20MW);
  // We don't expect the act response from the gateway.
  Wireless.setAckReq(false);
}

int measureSoilMoisture() {
  int value;

  value = analogRead(SENSOR_AIN);

  return value;
}
