#pragma once
#include <Arduino.h>

class PIDController {
public:
    PIDController(float kp, float ki, float kd, float minOut = -255.0f, float maxOut = 255.0f)
        : kp(kp), ki(ki), kd(kd), minOut(minOut), maxOut(maxOut) {}

    void setGains(float kp, float ki, float kd) {
        this->kp = kp;
        this->ki = ki;
        this->kd = kd;
    }

    void reset() {
        integral = 0.0f;
        prevError = 0.0f;
    }

    float compute(float setpoint, float measurement, float dt) {
        if (dt <= 0.0f) return 0.0f;
        float error = setpoint - measurement;
        
        integral += error * dt;
        // Anti-windup
        if (integral > maxOut) integral = maxOut;
        else if (integral < minOut) integral = minOut;

        float derivative = (error - prevError) / dt;
        
        float output = (kp * error) + (ki * integral) + (kd * derivative);
        
        if (output > maxOut) output = maxOut;
        else if (output < minOut) output = minOut;
        
        prevError = error;
        return output;
    }

private:
    float kp, ki, kd;
    float minOut, maxOut;
    float integral = 0.0f;
    float prevError = 0.0f;
};
