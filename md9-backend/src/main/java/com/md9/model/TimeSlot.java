package com.md9.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "timeslots")
public class Timeslot {
    @Id
    private String id;
    private String startTime;
    private String endTime;
    private String fieldId;

    //constructors
    public Timeslot(String id, String startTime, String endTime, String fieldId) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.fieldId = fieldId;
    }
    public Timeslot() {}

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getFieldId() {
        return this.fieldId;
    }

    public void setFieldId(String fieldId) {
        this.fieldId = fieldId;
    }
}
