#pragma once
#include <Arduino.h>
#include "config.h"

struct UltrasonicReadings {
    float front;
    float left;
    float right;
};

class UltrasonicSensor {
public:
    UltrasonicSensor(int trig, int echo) : trigPin(trig), echoPin(echo) {
        pinMode(trigPin, OUTPUT);
        pinMode(echoPin, INPUT);
        for(int i=0; i<5; i++) history[i] = 0;
    }

    float readDistance() {
        digitalWrite(trigPin, LOW);
        delayMicroseconds(2);
        digitalWrite(trigPin, HIGH);
        delayMicroseconds(10);
        digitalWrite(trigPin, LOW);

        long duration = pulseIn(echoPin, HIGH, 25000); // 25ms timeout ~ 4m
        if (duration == 0) return 400.0f;

        float cm = (duration / 2.0f) * 0.0343f;
        
        history[histIdx] = cm;
        histIdx = (histIdx + 1) % 5;
        
        float sum = 0;
        for(int i=0; i<5; i++) sum += history[i];
        return sum / 5.0f;
    }

private:
    int trigPin;
    int echoPin;
    float history[5];
    int histIdx = 0;
};

class UltrasonicArray {
public:
    UltrasonicArray() 
        : front(US_FRONT_TRIG, US_FRONT_ECHO), 
          left(US_LEFT_TRIG, US_LEFT_ECHO), 
          right(US_RIGHT_TRIG, US_RIGHT_ECHO) {}

    UltrasonicReadings readAll() {
        return { front.readDistance(), left.readDistance(), right.readDistance() };
    }

private:
    UltrasonicSensor front;
    UltrasonicSensor left;
    UltrasonicSensor right;
};
