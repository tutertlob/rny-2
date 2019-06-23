package com.github.tutertlob.iot_applications.soilmoisturemonitor;

import com.github.tutertlob.iotgateway.IoTApplication;
import com.github.tutertlob.iotgateway.Transceiver.PacketHandler;

import java.util.logging.Logger;
import java.util.List;
import java.util.Arrays;
import java.io.IOException;

/**
 * Main class.
 *
 */
public class SoilMoistureMonitorMain extends IoTApplication {

    private static final Logger logger = Logger.getLogger(SoilMoistureMonitorMain.class.getName());

    /**
     * Main method.
     * 
     * @param args
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        logger.info("Starting soil moisture monitor...");

        List<PacketHandler> handlers = Arrays.asList(new SoilMoistureMonitorHandler());
        launch(handlers);

        logger.info("The sensor system receiver exited.");
    }

    public SoilMoistureMonitorMain() {
        super();
    }

    @Override
    public void start() {

    }

    @Override
    public void finish() {

    }
}