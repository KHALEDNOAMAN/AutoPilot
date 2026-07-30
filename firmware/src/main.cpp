#include <Arduino.h>
#include <WiFi.h>
#include "config.h"
#include "motor_driver.h"
#include "ultrasonic.h"
#include "line_sensor.h"
#include "obstacle_avoider.h"
#include "autonomous_driver.h"

enum Mode {
    MANUAL,
    LINE_FOLLOW,
    OBSTACLE_AVOID,
    AUTONOMOUS
};

Mode currentMode = OBSTACLE_AVOID;

MotorDriver* motor;
UltrasonicArray* us;
LineSensorArray* lineSensors;
ObstacleAvoider* avoider;
AutonomousDriver* autoDriver;

unsigned long lastUpdate = 0;
const int dtMs = 20; // 50Hz control loop

void setupWiFi() {
    WiFi.softAP(AP_SSID, AP_PASSWORD);
    Serial.print("AP IP Address: ");
    Serial.println(WiFi.softAPIP());
}

void setup() {
    Serial.begin(115200);
    setupWiFi();

    motor = new MotorDriver();
    us = new UltrasonicArray();
    lineSensors = new LineSensorArray();
    avoider = new ObstacleAvoider();
    autoDriver = new AutonomousDriver(motor, us);

    Serial.println("AutoPilot Initialized");
}

void loop() {
    if (Serial.available()) {
        char c = Serial.read();
        if (c == 'm') currentMode = MANUAL;
        else if (c == 'l') currentMode = LINE_FOLLOW;
        else if (c == 'o') currentMode = OBSTACLE_AVOID;
        else if (c == 'a') currentMode = AUTONOMOUS;
    }

    unsigned long now = millis();
    if (now - lastUpdate >= dtMs) {
        lastUpdate = now;

        switch (currentMode) {
            case MANUAL:
                motor->coast(); // Waiting for external comms
                break;

            case LINE_FOLLOW:
            {
                float pos = lineSensors->getPosition();
                float steer = pos * 15.0f; // max pos is 2.0 * 15 = 30 deg
                motor->setSteeringAngle(steer);
                motor->setSpeed(MAX_SPEED / 2);
                break;
            }

            case OBSTACLE_AVOID:
            {
                UltrasonicReadings readings = us->readAll();
                DriveCommand cmd = avoider->update(readings.front, readings.left, readings.right);
                motor->setSpeed(cmd.speed);
                motor->setSteeringAngle(cmd.steeringAngle);
                break;
            }

            case AUTONOMOUS:
                // Needs real localization (odometry) for production.
                autoDriver->update(0, 0, 0.0f);
                break;
        }
    }
}
