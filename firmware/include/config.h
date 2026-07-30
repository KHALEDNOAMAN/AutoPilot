#pragma once

// Motor Pins
#define MOTOR_IN1 25
#define MOTOR_IN2 26
#define MOTOR_ENA 27

// Servo Pin
#define SERVO_PIN 13

// Ultrasonic Pins
#define US_FRONT_TRIG 32
#define US_FRONT_ECHO 33
#define US_LEFT_TRIG 18
#define US_LEFT_ECHO 19
#define US_RIGHT_TRIG 4
#define US_RIGHT_ECHO 5

// Line Sensor Pins
#define LINE_SENS_1 34
#define LINE_SENS_2 35
#define LINE_SENS_3 36
#define LINE_SENS_4 39
#define LINE_SENS_5 15

// PID Gains
#define PID_STEERING_KP 1.0f
#define PID_STEERING_KI 0.0f
#define PID_STEERING_KD 0.1f
#define PID_SPEED_KP 1.0f
#define PID_SPEED_KI 0.0f
#define PID_SPEED_KD 0.1f

// Grid Map Settings (A*)
#define GRID_WIDTH 20
#define GRID_HEIGHT 20
#define CELL_SIZE_CM 10

// Safety limits
#define MAX_SPEED 255
#define MIN_OBSTACLE_DIST 15.0f // cm

// WiFi Configuration
#define AP_SSID "AutoPilot_AP"
#define AP_PASSWORD "12345678"
