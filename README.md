# AutoPilot

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Python Version](https://img.shields.io/badge/python-3.8%2B-blue.svg)]()

An autonomous vehicle system combining computer vision, path planning, and PID control. Features real ESP32 firmware and an interactive 2D web simulator.

## Overview

AutoPilot is an autonomous vehicle system that combines computer vision, path planning, and control theory to enable self-driving capabilities. Built as both a real ESP32-based RC car controller and an interactive 2D simulator, it demonstrates the complete autonomous driving pipeline from raw camera input to motor actuation.

The project covers fundamental ADAS (Advanced Driver Assistance Systems) concepts that are used in production self-driving vehicles, scaled down to an educational platform.

---

## Key Features

- **Lane Detection:** Utilizes Canny edge detection and Hough transform.
- **A\* Path Planning:** Computes optimal routes with dynamic obstacle avoidance.
- **PID Steering Controller:** Smooth and continuous course correction.
- **Camera Calibration Pipeline:** Distortion removal and perspective transformation.
- **ESP32 Motor Control Firmware:** Embedded software for real-time actuation.
- **Interactive 2D Simulator:** Playable web game to test algorithms.
- **Real-Time Telemetry Dashboard:** Monitoring for sensor data and control outputs.

## Architecture

`	ext
Camera â†’ Preprocessing â†’ Lane Detection â†’ Path Planning (A*) â†’ PID Steering â†’ Motor Control
                                                 â†‘
                                           Obstacle Map
`

## Tech Stack

| Component | Technology |
| --- | --- |
| **Computer Vision** | Python, OpenCV |
| **Path Planning** | Python |
| **Embedded System** | ESP32 (C/C++) |
| **Simulator** | TypeScript, Canvas API |

## How It Works

1. **Lane Detection Pipeline:** The input camera feed is transformed to a bird's-eye view. Edge detection and Hough transforms identify lane boundaries.
2. **Path Planning (A\*):** Given a global map and obstacles, the A* algorithm continuously calculates the optimal, collision-free trajectory.
3. **PID Control:** The difference between the vehicle's current heading and the target path generates an error signal. The PID controller adjusts steering angle to minimize this error.

## Getting Started

### Prerequisites

- Python 3.8+
- OpenCV
- Node.js (for the simulator)

### Setup

1. **Clone the repository:**
   ``bash
   git clone https://github.com/KHALEDNOAMAN/AutoPilot.git
   cd AutoPilot
   ``

2. **Install Python dependencies:**
   ``bash
   pip install -r requirements.txt
   ``

3. **Run the Simulator:**
   ``bash
   cd simulator
   npm install
   npm run dev
   ``

## Project Structure

`
AutoPilot/
â”œâ”€â”€ cv/                 # Computer vision and lane detection
â”œâ”€â”€ planning/           # A* path planning implementation
â”œâ”€â”€ control/            # PID controller
â”œâ”€â”€ firmware/           # ESP32 C/C++ code
â”œâ”€â”€ simulator/          # TypeScript/Canvas web simulator
â”œâ”€â”€ tests/              # Unit and integration tests
â””â”€â”€ README.md
`

## Lane Detection Pipeline

The lane detection sequence consists of the following steps:
1. **Camera Calibration:** Correcting lens distortion.
2. **Perspective Warp:** Transforming the image to a top-down, bird's-eye view.
3. **Color Filtering:** Isolating road markings.
4. **Edge Detection:** Applying the Canny operator.
5. **Line Extraction:** Using Hough transform to define lane boundaries.

## Roadmap

- [ ] Implement robust object detection (YOLO)
- [ ] Add extended Kalman filter for sensor fusion
- [ ] Migrate critical components to C++ for performance
- [ ] Improve simulator physics


---

## Screenshots & Demo

### Lane Detection Pipeline
```
Input Frame          Edge Detection       Lane Lines Found
┌──────────┐        ┌──────────┐        ┌──────────┐
│  Road    │  ───►  │ ░░░░░░░░ │  ───►  │  / Road \ │
│ ──────── │  Canny │ ░░    ░░ │ Hough  │ /────────\│
│/        \│        │░░      ░░│        │/          \│
└──────────┘        └──────────┘        └──────────┘
```

### 2D Simulator
```
┌───────────────────────────────────┐
│  AutoPilot - 2D Simulator        │
│  ┌─────────────────────────────┐ │
│  │    ══════════════           │ │
│  │   ║   🚗 ←car  ║           │ │
│  │    ══════╗══════            │ │
│  │          ║     ★ waypoint   │ │
│  │    ══════╝══════            │ │
│  │   ║  obstacles  ║          │ │
│  └─────────────────────────────┘ │
│  Speed: 2.3 m/s | Steering: 5°  │
│  Mode: [Auto] [Manual] [Pause]   │
└───────────────────────────────────┘
```

### Live Demo
> Run the simulator: `npm install && npm run dev`
> Open `http://localhost:3000`
> Toggle between manual (arrow keys) and autonomous mode!


## Contributing

Contributions are welcome. Please open an issue first to discuss what you would like to change. 

## License

This project is licensed under the MIT License.