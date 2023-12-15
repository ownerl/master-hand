import mediapipe as mp
import cv2
import time
import pyautogui as gui
from threading import Thread, Lock
from hands import HandDetector

# Initialize MediaPipe components
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
detect = HandDetector(max_hands=1)

class ThreadedCamera:
    """
    Threaded Camera class for continuous frame capture.
    """
    def __init__(self, source=0):
        self.capture = cv2.VideoCapture(source)
        self.capture.set(cv2.CAP_PROP_FPS, 30)
        self.capture.set(cv2.CAP_PROP_BUFFERSIZE, 2)

        self.status = False
        self.frame = None
        self.lock = Lock()
        self.thread = Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()

    def update(self):
        while True:
            if self.capture.isOpened():
                self.status, self.frame = self.capture.read()

    def grab_frame(self):
        with self.lock:
            return self.status, self.frame

class SharedData:
    """
    Shared data structure for communication between threads.
    """
    def __init__(self):
        self.lock = Lock()
        self.landmark_list = []
        self.image = None
        self.pinched = False
        self.click_down = False

    def update(self, landmark_list, image, pinched):
        with self.lock:
            self.landmark_list = landmark_list
            self.image = image
            self.pinched = pinched

    def get_data(self):
        with self.lock:
            return self.landmark_list, self.image, self.pinched

def gui_actions(shared_data):
    """
    Thread function for handling GUI actions.
    """
    while True:
        landmark_list, image, pinched = shared_data.get_data()
        if image is not None and landmark_list:
            x5, y5 = landmark_list[5][1:]
            gui.moveTo(x5, y5)
            if pinched and not shared_data.click_down:
                gui.mouseDown()
                shared_data.click_down = True
            elif not pinched and shared_data.click_down:
                gui.mouseUp()
                shared_data.click_down = False

def process_frame(frame, detect, shared_data):
    """
    Process each frame for hand detection and updates shared data.
    """
    # frame = cv2.flip(frame, 1)
    new_frame = detect.find_hands(frame, True)
    if type(new_frame) != type(None):
        landmark_list = detect.find_position(new_frame, draw=False)
        pinched = detect.fingers_pinch(new_frame)
        shared_data.update(landmark_list, new_frame, pinched)
        return new_frame
    else:
        return None

def main():
    """
    Main function to initialize and run the application.
    """
    streamer = ThreadedCamera(0)
    shared_data = SharedData()
    gui_thread = Thread(target=gui_actions, args=(shared_data,))
    gui_thread.daemon = True
    gui_thread.start()
    present_time = 0

    while True:
        success, frame = streamer.grab_frame()
        if success and frame is not None:
            frame = cv2.flip(frame, 1)
            new_frame = process_frame(frame, detect, shared_data)
            current_time = time.time()
            fps = 1 / (current_time - present_time)
            present_time = current_time
            if type(new_frame) != type(None):
                cv2.putText(new_frame, f"{int(fps)} FPS", (30, 50), cv2.FONT_HERSHEY_COMPLEX_SMALL, 3, (255, 255, 0), 2)
                cv2.imshow('MediaPipe ', new_frame)
                print('not none! ')
            else:
                cv2.putText(frame, f"{int(fps)} FPS", (30, 50), cv2.FONT_HERSHEY_COMPLEX_SMALL, 3, (255, 255, 0), 2)
                cv2.imshow('MediaPipe ', frame)
                print(' got none so its default')

        if cv2.waitKey(5) & 0xFF == 27:
            break

    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
