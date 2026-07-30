#pragma once
#include <Arduino.h>
#include "config.h"

class LineSensorArray {
public:
    LineSensorArray() {
        pinMode(LINE_SENS_1, INPUT);
        pinMode(LINE_SENS_2, INPUT);
        pinMode(LINE_SENS_3, INPUT);
        pinMode(LINE_SENS_4, INPUT);
        pinMode(LINE_SENS_5, INPUT);
    }

    void calibrate() {
        // Dummy calibration, placeholder for learning min/max
    }

    float getPosition() {
        int v[5];
        v[0] = analogRead(LINE_SENS_1);
        v[1] = analogRead(LINE_SENS_2);
        v[2] = analogRead(LINE_SENS_3);
        v[3] = analogRead(LINE_SENS_4);
        v[4] = analogRead(LINE_SENS_5);

        float sum = 0;
        float weightedSum = 0;
        float weights[5] = {-2.0f, -1.0f, 0.0f, 1.0f, 2.0f};

        for (int i = 0; i < 5; i++) {
            sum += v[i];
            weightedSum += v[i] * weights[i];
        }

        if (sum == 0) return 0;
        return weightedSum / sum;
    }

    bool isOnLine() {
        return analogRead(LINE_SENS_3) > 2000; 
    }

    bool isIntersection() {
        int count = 0;
        if (analogRead(LINE_SENS_1) > 2000) count++;
        if (analogRead(LINE_SENS_2) > 2000) count++;
        if (analogRead(LINE_SENS_3) > 2000) count++;
        if (analogRead(LINE_SENS_4) > 2000) count++;
        if (analogRead(LINE_SENS_5) > 2000) count++;
        return count >= 3;
    }
};
