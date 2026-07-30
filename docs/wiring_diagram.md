# Wiring Diagram — AutoPilot RC Car

## Top View

```
         FRONT
    ┌──────────────┐
    │  [Servo]     │ ← Steering
    │   ┌──┐       │
    ├───┤  ├───────┤
    │   └──┘       │
    │              │
    │    [ESP32]   │
    │              │
    │  [L298N]     │ ← Motor Driver
    │              │
    │ ┌──┐   ┌──┐ │
    ├─┤M1├───┤M2├─┤ ← Drive Motors
    │ └──┘   └──┘ │
    └──────────────┘
         REAR
```

## Sensor Placement

```
        [US-Front]
           ▲
    [US-L] │ [US-R]
      ◄────┼────►
           │
    ┌──────┼──────┐
    │ [L1][L2][L3]│ ← Line sensors (bottom)
    │    [L4][L5] │
    └─────────────┘
```

## ESP32 Pin Mapping

### Motor Driver (L298N)
| L298N Pin | ESP32 GPIO | Function |
|-----------|-----------|----------|
| IN1 | GPIO 25 | Motor direction A |
| IN2 | GPIO 26 | Motor direction B |
| ENA | GPIO 27 | Motor speed (PWM) |

### Steering Servo
| Servo Pin | ESP32 GPIO | Function |
|-----------|-----------|----------|
| Signal | GPIO 13 | Steering angle |
| VCC | 5V (from L298N) | Power |
| GND | GND | Ground |

### Ultrasonic Sensors (HC-SR04)
| Sensor | TRIG GPIO | ECHO GPIO |
|--------|----------|----------|
| Front | GPIO 32 | GPIO 33 |
| Left | GPIO 18 | GPIO 19 |
| Right | GPIO 4 | GPIO 5 |

### Line Sensors (TCRT5000)
| Sensor | ESP32 GPIO | Position |
|--------|-----------|----------|
| L1 | GPIO 34 | Far Left |
| L2 | GPIO 35 | Left |
| L3 | GPIO 36 | Center |
| L4 | GPIO 39 | Right |
| L5 | GPIO 15 | Far Right |

## Power

```
Battery (7.4V 2S LiPo)
├── L298N 12V Input → Motors
├── L298N 5V Output → Servo, Sensors
└── ESP32 VIN → ESP32 board
```

## Parts List (BOM)

| # | Component | Model | Qty | Cost |
|---|-----------|-------|-----|------|
| 1 | Microcontroller | ESP32 DevKit V1 | 1 | $6 |
| 2 | Motor Driver | L298N | 1 | $3 |
| 3 | DC Motors | TT Motor + Wheels | 2 | $4 |
| 4 | Steering Servo | SG90 | 1 | $2 |
| 5 | Ultrasonic Sensor | HC-SR04 | 3 | $4 |
| 6 | Line Sensor | TCRT5000 | 5 | $3 |
| 7 | Car Chassis | 2WD Smart Car Kit | 1 | $12 |
| 8 | Battery | 7.4V 2S 1500mAh LiPo | 1 | $10 |
| 9 | Wires, Breadboard | Jumper wires | 1 set | $3 |
| | | | **Total** | **~$47** |
