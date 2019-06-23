package com.github.tutertlob.iot_applications.soilmoisturemonitor;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class SoilMoistureRecord {

    @SerializedName("moisture")
    @Expose
    private Short moisture;

    public SoilMoistureRecord() {

    }

    public SoilMoistureRecord(Short moisture) {
        this.moisture = moisture;
    }
}