#pragma once
#include <Arduino.h>
#include <ESP32Servo.h>
#include "config.h"

class MotorDriver {
public:
    MotorDriver() {
        pinMode(MOTOR_IN1, OUTPUT);
        pinMode(MOTOR_IN2, OUTPUT);
        pinMode(MOTOR_ENA, OUTPUT);
        steeringServo.attach(SERVO_PIN);
    }

    void setSpeed(int speed) {
        speed = constrain(speed, -MAX_SPEED, MAX_SPEED);
        if (speed > 0) {
            digitalWrite(MOTOR_IN1, HIGH);
            digitalWrite(MOTOR_IN2, LOW);
            analogWrite(MOTOR_ENA, speed);
        } else if (speed < 0) {
            digitalWrite(MOTOR_IN1, LOW);
            digitalWrite(MOTOR_IN2, HIGH);
            analogWrite(MOTOR_ENA, -speed);
        } else {
            coast();
        }
    }

    void setSteeringAngle(float angle) {
        angle = constrain(angle, -30.0f, 30.0f);
        int servoVal = map(angle, -30, 30, 60, 120);
        steeringServo.write(servoVal);
    }

    void brake() {
        digitalWrite(MOTOR_IN1, HIGH);
        digitalWrite(MOTOR_IN2, HIGH);
        analogWrite(MOTOR_ENA, MAX_SPEED);
    }

    void coast() {
        digitalWrite(MOTOR_IN1, LOW);
        digitalWrite(MOTOR_IN2, LOW);
        analogWrite(MOTOR_ENA, 0);
    }

private:
    Servo steeringServo;
};
