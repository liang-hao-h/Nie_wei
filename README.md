# Nie_wei
Independently developed an AI intelligent video surveillance platform with real-time detection, automatic alarm and centralized device management.

Table of Contents
1.Environment Requirements & Dependency Installation
2.Project Overview
3.Core Implementation Logic
4.Key Technical Highlights
5.Extension & Optimization Recommendations

Environment Requirements & Dependency Installation
Required Python Packages
This project relies on mainstream deep learning and computer vision libraries. Run the following commands for installation:
<img width="878" height="290" alt="image" src="https://github.com/user-attachments/assets/6b26fa7f-eb8c-4643-9813-329d259c9eb8" />

# Full one-click installation (RECOMMENDED)
pip install ultralytics torch torchvision pillow

# Version-specified installation (for compatibility)
pip install ultralytics==8.3.240
pip install torch==2.9.0
pip install torchvision==0.24.0
pip install pillow==10.4.0

# Optional: OpenCV alternative (for advanced image processing)
pip install opencv-python==4.12.0.88

📌 Note: tkinter is a Python built-in GUI library and does not require separate installation.
Package Functionality
<img width="715" height="326" alt="image" src="https://github.com/user-attachments/assets/02d1d80f-4ef3-474a-b872-1373215e0ef6" />

Environment Verification Script
Run this script to validate your environment setup:
<img width="779" height="539" alt="image" src="https://github.com/user-attachments/assets/24231619-a779-4819-8180-898491bf9a28" />
# check_environment.py
import sys

def check_packages():
    packages = [
        ('ultralytics', '8.3.240'),
        ('torch', '2.9.0'),
        ('torchvision', '0.24.0'),
        ('PIL', '10.4.0'),  # Alias for pillow
    ]
    
    for package, expected_version in packages:
        try:
            if package == 'PIL':
                import PIL
                version = PIL.__version__
            else:
                module = __import__(package)
                version = getattr(module, '__version__', 'Unknown')
            
            print(f"✓ {package}: {version}")
        except ImportError:
            print(f"✗ {package}: Not Installed")

if __name__ == "__main__":
    print("Python Version:", sys.version)
    print("\nPackage Check Result:")
    check_packages()

Installation Notes
1.Python Compatibility: Python 3.8 ~ 3.11 (Python 3.13 is not recommended due to compatibility issues)
2.GPU Acceleration: Install CUDA-enabled PyTorch for faster inference
<img width="618" height="36" alt="image" src="https://github.com/user-attachments/assets/bd2ebeb3-81d7-473c-a566-4a66a8daa8c1" />
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118

3.Virtual Environment: Isolate dependencies with a virtual environment
# Create & activate (Windows)
python -m venv yolo_env
yolo_env\Scripts\activate

4.Domestic Mirror Acceleration (China mainland users)
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple ultralytics torch torchvision pillow

Project Overview
This project implements a YOLO-based intelligent video surveillance system with the following core features:
Real-time video stream object detection
User-controllable detection status (enable/disable)
Visualized detection results (bounding boxes, class labels, confidence scores)
Automatic image capture & save when a target is detected (single capture only)

Core Implementation Logic
1. System Architecture
1.1 Class Structure Design
class MonitorApp:
    def __init__(self, root):  # Initialize GUI and YOLO model
    def setup_ui(self):        # Build user interface components
    def toggle_detection(self): # Switch detection status
    def start_detection(self):  # Start detection thread
    def stop_detection(self):   # Stop detection safely
    def run_detection(self):    # Main detection loop
    def save_detected_image(self, frame): # Save annotated result
    def update_display(self, frame):     # Refresh GUI display

1.2 Core State Variables
detection_enabled: Detection activation flag
running: Thread execution status
image_saved: Single-image capture lock (prevents duplicate saves)
confidence_threshold: Model confidence filter threshold
2. Detection Control Logic
2.1 Start Detection Flow
def start_detection(self):
    # 1. Update state flags
    self.detection_enabled = True
    self.image_saved = False
    
    # 2. Refresh UI status
    self.enable_button.config(text="Disable Detection")
    self.status_label.config(text="Status: Detection Enabled")
    
    # 3. Start daemon thread (avoids GUI freezing)
    self.running = True
    self.detection_thread = threading.Thread(target=self.run_detection)
    self.detection_thread.daemon = True
    self.detection_thread.start()

2.2 Stop Detection Flow (Thread-Safe)
def stop_detection(self):
    # 1. Set termination flags
    self.detection_enabled = False
    self.running = False
    
    # 2. Wait for thread to exit (timeout = 2s)
    if self.detection_thread and self.detection_thread.is_alive():
        self.detection_thread.join(timeout=2)
    
    # 3. Reset UI status
    self.enable_button.config(text="Enable Detection")
    self.status_label.config(text="Status: Detection Disabled")

3. YOLO Inference Core
3.1 Streaming Detection
def run_detection(self):
    # YOLO streaming inference (prevents memory overflow for long videos)
    results = self.model.predict(
        source=self.video_path,
        conf=self.confidence_threshold,
        stream=True,  # Critical for real-time processing
        verbose=False
    )
    
    for result in results:
        # Exit loop if termination is triggered
        if not self.running or not self.detection_enabled:
            break
        self.process_detection_result(result)

3.2 Detection Result Processing
def process_detection_result(self, result):
    # Get original and annotated frame
    frame = result.orig_img
    annotated_frame = result.plot()  # Auto-draw bounding boxes/labels
    
    # Capture image if targets are detected AND no image saved yet
    if len(result.boxes) > 0 and not self.image_saved:
        self.handle_detected_target(result, annotated_frame)
    
    # Update GUI display
    self.update_display(annotated_frame)

4. Target Detection & Capture Logic
4.1 Target Handling
def handle_detected_target(self, result, annotated_frame):
    for box in result.boxes:
        if box.conf >= self.confidence_threshold:
            # Save result & log info
            self.save_detected_image(annotated_frame)
            class_name = self.model.names[int(box.cls)]
            self.log_detection_info(class_name, float(box.conf))
            
            # Lock capture & stop detection
            self.image_saved = True
            self.display_and_stop(annotated_frame)
            break

    # Exit inference loop immediately after capture
    if self.image_saved:
        raise StopIteration

4.2 Anti-Duplicate Capture Mechanism
The image_saved flag acts as a lock to ensure only one image is saved when a target is detected, avoiding redundant processing.
5. Image Saving Logic
def save_detected_image(self, frame):
    # Auto-create output directory
    results_dir = "detection_results"
    if not os.path.exists(results_dir):
        os.makedirs(results_dir)
    
    # Generate unique filename with timestamp
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    filename = os.path.join(results_dir, f"detected_{timestamp}.jpg")
    
    # Save with PIL (cross-environment compatibility)
    image = Image.fromarray(frame)
    image.save(filename)

6. GUI Display Logic (Thread-Safe)
def update_display(self, frame):
    # Resize frame for GUI display
    frame_resized = self.resize_image(frame, 800, 600)
    
    # Convert to Tkinter-compatible format
    image = Image.fromarray(frame_resized)
    photo = ImageTk.PhotoImage(image)
    
    # Update display (must run in main thread)
    self.video_label.configure(image=photo, text="")
    self.video_label.image = photo  # Prevent garbage collection

7. Error Handling & Resource Cleanup
7.1 Exception Handling
try:
    self.run_detection()
except Exception as e:
    self.log(f"Detection Error: {str(e)}")
    self.stop_detection()

7.2 Safe Window Closure
def on_closing(self):
    # Force-stop threads & release resources
    self.running = False
    self.detection_enabled = False
    
    if self.detection_thread and self.detection_thread.is_alive():
        self.detection_thread.join(timeout=2)
    
    self.root.destroy()

Key Technical Highlights
Multithreaded Architecture
Isolates GUI and detection logic to eliminate interface freezing
Thread-safe communication via state flags
Daemon threads for reliable resource release
YOLO Streaming Inference
stream=True optimizes memory usage for long video streams
Built-in plot() method for fast result visualization
Configurable confidence threshold for accuracy control
Anti-Duplicate Capture
Atomic state lock ensures single image capture per detection event
Immediate loop termination after capture to save resources
User Experience
Real-time visual feedback
Clear status indicators
Robust error handling and auto-recovery
Extension & Optimization Recommendations
Performance Optimization
Model Lightweight: Use YOLOv8n/nano for faster CPU inference
GPU Acceleration: Enable CUDA for high-frame-rate processing
Batch Processing: Add frame batching for bulk video analysis
Feature Expansion
Multi-Object Tracking: Integrate ByteTrack/DeepSORT for target tracking
Alarm System: Add sound/email/webhook alerts on detection
History Logging: Save detection records to a database/CSV file
Multi-Source Support: Support IP cameras, RTSP streams, and file videos
Deployment Optimization
Config File: Externalize thresholds/paths via YAML/JSON configs
Logging System: Implement structured logging with logging module
Web Dashboard: Migrate GUI to Flask/FastAPI for remote access



