#pragma once
#include "path_planner.h"
#include "pid_controller.h"
#include "ultrasonic.h"
#include "motor_driver.h"

class AutonomousDriver {
public:
    enum State {
        PLANNING,
        FOLLOWING,
        ARRIVED,
        BLOCKED
    };

    AutonomousDriver(MotorDriver* motor, UltrasonicArray* us) 
        : motor(motor), us(us), steeringPID(PID_STEERING_KP, PID_STEERING_KI, PID_STEERING_KD, -30, 30) {
        state = PLANNING;
    }

    void setGoal(int x, int y) {
        goal = {x, y};
        state = PLANNING;
    }

    void update(int currentX, int currentY, float currentHeading) {
        UltrasonicReadings ur = us->readAll();
        
        if (ur.front < MIN_OBSTACLE_DIST) {
            motor->brake();
            state = BLOCKED;
            return;
        }

        switch (state) {
            case PLANNING:
                planner.planPath(currentX, currentY, goal.x, goal.y);
                targetWaypoint = planner.getNextWaypoint();
                state = FOLLOWING;
                break;
                
            case FOLLOWING:
                if (currentX == targetWaypoint.x && currentY == targetWaypoint.y) {
                    targetWaypoint = planner.getNextWaypoint();
                    if (targetWaypoint.x == -1) {
                        state = ARRIVED;
                        motor->coast();
                        return;
                    }
                }
                
                {
                    float targetHeading = atan2(targetWaypoint.y - currentY, targetWaypoint.x - currentX) * 180.0f / M_PI;
                    float steeringCmd = steeringPID.compute(targetHeading, currentHeading, 0.02f);
                    
                    motor->setSpeed(MAX_SPEED / 2);
                    motor->setSteeringAngle(steeringCmd);
                }
                break;
                
            case ARRIVED:
                motor->brake();
                break;
                
            case BLOCKED:
                state = PLANNING;
                break;
        }
    }

private:
    MotorDriver* motor;
    UltrasonicArray* us;
    AStarPlanner planner;
    PIDController steeringPID;
    State state;
    Point goal;
    Point targetWaypoint;
};
