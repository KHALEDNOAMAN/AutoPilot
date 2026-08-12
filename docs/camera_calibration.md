# Camera Calibration for Lane Detection

## Steps
1. Print checkerboard pattern (9x6)
2. Take 20+ photos from different angles
3. Use OpenCV calibrateCamera()
4. Save intrinsic matrix
5. Apply undistort() before processing