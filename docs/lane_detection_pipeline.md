# Lane Detection Pipeline

1. Camera capture (30fps)
2. Undistort (calibration matrix)
3. Perspective transform (bird eye)
4. Color threshold (HSL white/yellow)
5. Canny edge detection
6. Hough line transform
7. Lane line fitting (polynomial)
8. Curvature calculation
9. Steering angle output