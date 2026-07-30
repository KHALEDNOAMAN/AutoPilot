<div align="center">

# 🏎️ AutoPilot

**Autonomous RC Car with A* Path Planning, PID Lane Following, Obstacle Avoidance & Interactive 2D Simulator**

[![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white)](https://isocpp.org/)
[![ESP32](https://img.shields.io/badge/ESP32-E7352C?style=for-the-badge&logo=espressif&logoColor=white)](https://www.espressif.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**Real ESP32 firmware** for autonomous driving + **Playable 2D simulator** to test algorithms before deployment.

[🎮 **Try the Simulator**](https://auto-pilot-elnoaman.vercel.app) | [📄 **Wiring Guide**](docs/wiring_diagram.md)

</div>

---

## 🏗️ Architecture — Software-in-the-Loop

```
┌──────────────────────────────────────────────────┐
│                   AutoPilot                       │
├───────────────────┬──────────────────────────────┤
│   /firmware       │     /simulator               │
│   ESP32 C++ Code  │     2D Canvas Game           │
│                   │                              │
│  ┌─────────────┐  │  ┌──────────────────────────┐│
│  │ PID Steering│◄─┼──│  Same PID Algorithm      ││
│  │ Controller  │  │  │  (TypeScript port)       ││
│  └─────────────┘  │  └──────────────────────────┘│
│  ┌─────────────┐  │  ┌──────────────────────────┐│
│  │ A* Path     │  │  │  Same A* Algorithm       ││
│  │ Planning    │  │  │  (visible on mini-map)   ││
│  └─────────────┘  │  └──────────────────────────┘│
│  ┌─────────────┐  │  ┌──────────────────────────┐│
│  │ HC-SR04     │  │  │  Simulated Ray-Cast      ││
│  │ Ultrasonics │  │  │  Sensors                 ││
│  └─────────────┘  │  └──────────────────────────┘│
├───────────────────┴──────────────────────────────┤
│  Test in simulator → Flash to real ESP32 car     │
└──────────────────────────────────────────────────┘
```

---

## 🎮 Simulator Controls

| Key | Action |
|-----|--------|
| W / ↑ | Accelerate |
| S / ↓ | Brake / Reverse |
| A / ← | Steer left |
| D / → | Steer right |
| Space | Handbrake |
| Tab | Toggle Autopilot ON/OFF |
| M | Toggle mini-map |
| V | Toggle sensor visualization |
| R | Reset car position |
| 1-3 | Change maps |

---

## 🔧 Firmware — Real Hardware

### Components

| Component | Model | Purpose |
|-----------|-------|---------|
| Microcontroller | ESP32 DevKit | Main controller + WiFi |
| Ultrasonic Front | HC-SR04 | Forward distance |
| Ultrasonic Left | HC-SR04 | Left distance |
| Ultrasonic Right | HC-SR04 | Right distance |
| Line Sensors | 5x TCRT5000 | Lane following |
| Motor Driver | L298N | DC motor control |
| DC Motor | TT Motor | Drive wheels |
| Servo Motor | SG90 | Steering |
| Battery | 7.4V 2S LiPo | Power |

### Driving Modes

| Mode | Description |
|------|-------------|
| **Manual** | Bluetooth/WiFi remote control via phone |
| **Line Follow** | PID-based line tracking with 5 sensors |
| **Obstacle Avoid** | Ultrasonic-based reactive avoidance |
| **Autonomous** | A* path planning + PID navigation |

---

## 🚀 Quick Start

### Simulator (no hardware needed)
```bash
cd simulator
npm install
npm run dev
# Open http://localhost:5173 — drive the car! 🏎️
```

### Firmware (with hardware)
```bash
pip install platformio
cd firmware
pio run -t upload    # Flash to ESP32
pio device monitor   # Serial monitor
```

---

## 📊 Algorithms

### A* Path Planning
```
1. Create grid map from environment
2. Set start = car position, goal = destination
3. For each cell, calculate: f(n) = g(n) + h(n)
   g(n) = cost from start to n
   h(n) = Manhattan distance to goal
4. Expand lowest f(n) node, repeat until goal reached
5. Trace back optimal path
```

### PID Lane Centering
```
Error = Lane_Center - Car_Position
Steering = Kp × Error + Ki × ∫Error + Kd × dError/dt
```

---

## 📝 License
MIT License — see [LICENSE](LICENSE) file.

<div align="center">
Built by [Khaled Noaman](https://github.com/KHALEDNOAMAN) — Computer Engineering Student 🚀
</div>
