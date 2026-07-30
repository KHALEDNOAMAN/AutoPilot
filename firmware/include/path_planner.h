#pragma once
#include <vector>
#include <cmath>
#include <algorithm>
#include "config.h"

struct Point {
    int x;
    int y;
    bool operator==(const Point& o) const { return x == o.x && y == o.y; }
};

struct Node {
    Point pos;
    float g, h, f;
    Node* parent;
};

class AStarPlanner {
public:
    AStarPlanner() {
        for(int i=0; i<GRID_WIDTH; i++) {
            for(int j=0; j<GRID_HEIGHT; j++) {
                grid[i][j] = false;
            }
        }
    }

    void setObstacle(int x, int y, bool blocked = true) {
        if (x >= 0 && x < GRID_WIDTH && y >= 0 && y < GRID_HEIGHT) {
            grid[x][y] = blocked;
        }
    }

    std::vector<Point> planPath(int startX, int startY, int goalX, int goalY) {
        std::vector<Point> path;
        
        // Simplified fallback line-drawing if full A* logic is skipped
        Point current = {startX, startY};
        Point goal = {goalX, goalY};
        
        while (!(current == goal)) {
            path.push_back(current);
            if (current.x < goal.x) current.x++;
            else if (current.x > goal.x) current.x--;
            
            if (current.y < goal.y) current.y++;
            else if (current.y > goal.y) current.y--;
        }
        path.push_back(goal);
        
        waypoints = path;
        waypointIdx = 0;
        return path;
    }

    Point getNextWaypoint() {
        if (waypointIdx < waypoints.size()) {
            return waypoints[waypointIdx++];
        }
        return {-1, -1};
    }

private:
    bool grid[GRID_WIDTH][GRID_HEIGHT];
    std::vector<Point> waypoints;
    size_t waypointIdx = 0;
};
