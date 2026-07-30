#pragma once
#include "config.h"

struct DriveCommand {
    int speed;
    float steeringAngle;
};

class ObstacleAvoider {
public:
    enum State {
        DRIVE_FORWARD,
        TURN_LEFT,
        TURN_RIGHT,
        REVERSE
    };

    ObstacleAvoider() : state(DRIVE_FORWARD) {}

    DriveCommand update(float frontDist, float leftDist, float rightDist) {
        DriveCommand cmd = {0, 0.0f};

        switch(state) {
            case DRIVE_FORWARD:
                if (frontDist < MIN_OBSTACLE_DIST) {
                    if (leftDist > rightDist) {
                        state = TURN_LEFT;
                    } else {
                        state = TURN_RIGHT;
                    }
                    if (leftDist < MIN_OBSTACLE_DIST && rightDist < MIN_OBSTACLE_DIST) {
                        state = REVERSE;
                    }
                } else {
                    cmd.speed = MAX_SPEED / 2;
                    cmd.steeringAngle = 0.0f;
                }
                break;
            case TURN_LEFT:
                cmd.speed = MAX_SPEED / 3;
                cmd.steeringAngle = -30.0f;
                if (frontDist > MIN_OBSTACLE_DIST * 1.5f) {
                    state = DRIVE_FORWARD;
                }
                break;
            case TURN_RIGHT:
                cmd.speed = MAX_SPEED / 3;
                cmd.steeringAngle = 30.0f;
                if (frontDist > MIN_OBSTACLE_DIST * 1.5f) {
                    state = DRIVE_FORWARD;
                }
                break;
            case REVERSE:
                cmd.speed = -MAX_SPEED / 3;
                cmd.steeringAngle = 0.0f;
                if (frontDist > MIN_OBSTACLE_DIST * 2.0f) {
                    state = TURN_RIGHT;
                }
                break;
        }

        return cmd;
    }

private:
    State state;
};
