# PID Tuning Guide

## Ziegler-Nichols Method
1. Set Ki=0, Kd=0
2. Increase Kp until oscillation (Ku)
3. Measure period (Tu)
4. Kp=0.6*Ku, Ki=2*Kp/Tu, Kd=Kp*Tu/8

## Manual Tuning
1. Start with low Kp
2. Increase until responsive
3. Add Kd to reduce overshoot
4. Add Ki to eliminate steady-state error