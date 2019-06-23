package com.github.tutertlob.iot_applications.soilmoisturemonitor;

import java.util.logging.Logger;
import java.lang.NullPointerException;

import com.github.tutertlob.iotgateway.DatabaseUtil;
import com.github.tutertlob.iotgateway.DatabaseUtilFactory;
import com.github.tutertlob.iotgateway.Transceiver;
import com.github.tutertlob.iotgateway.Transceiver.PacketHandler;
import com.github.tutertlob.iotgateway.SensorEntity;
import com.github.tutertlob.iotgateway.SensorRecord;
import com.github.tutertlob.subghz.NoticePacketInterface;
import com.github.tutertlob.subghz.PacketImplementation;
import com.github.tutertlob.subghz.SubGHzFrame;

public class SoilMoistureMonitorHandler implements PacketHandler {

    private static final Logger logger = Logger.getLogger(SoilMoistureMonitorHandler.class.getName());

    @Override
    public void handle(SubGHzFrame frame) {
        PacketImplementation packet = frame.getPacket();
        if (!(packet instanceof NoticePacketInterface)) {
            return;
        }

        NoticePacketInterface notice = (NoticePacketInterface) packet;
        String data = notice.getNotice();
        String[] moisture = data.split(":");

        try {
            SensorEntity sensor = SensorEntity.lookUpSensor(frame.getSenderAddr());
            SoilMoistureRecord sample = new SoilMoistureRecord(Short.valueOf(moisture[1]));
            SensorRecord<SoilMoistureRecord> record = new SensorRecord<>(sensor, sample)
                    .setRssi(Integer.valueOf(frame.getRssi()))
                    .setPacketType(frame.getPacket().getPacketType().toString())
                    .setContentType("soilmoisturemonitor;application/json");

            DatabaseUtil db = DatabaseUtilFactory.getDatabaseUtil();
            db.insertSensorRecord(record);
        } catch (NullPointerException e) {
            SensorEntity sensor = new SensorEntity().setAddr(frame.getSenderAddr()).setPanid(frame.getSenderExtAddr());
            SoilMoistureRecord sample = new SoilMoistureRecord(Short.valueOf(moisture[1]));
            SensorRecord<SoilMoistureRecord> record = new SensorRecord<>(sensor, sample)
                    .setRssi(Integer.valueOf(frame.getRssi()))
                    .setPacketType(frame.getPacket().getPacketType().toString())
                    .setContentType("soilmoisturemonitor;application/json");

            DatabaseUtil db = DatabaseUtilFactory.getDatabaseUtil();
            db.insertSensorRecord(record);
        }

        logger.info("a soil mositure monitoring report has been received: \n" + notice);
    }

}
