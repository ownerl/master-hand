import mediapipe as mp
import numpy as np
import cv2 
from hands import HandDetector
import time 
import pyautogui as gui
from threading import Thread

mp_pose = mp.solutions.pose
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
hands = mp_hands.Hands(max_num_hands=1)

class ThreadedCamera(object):
    def __init__(self, source = 0):

        self.capture = cv2.VideoCapture(source)

        self.thread = Thread(target = self.update, args = ())
        self.thread.daemon = True
        self.thread.start()

        self.status = False
        self.frame  = None

    def update(self):
        while True:
            if self.capture.isOpened():
                (self.status, self.frame) = self.capture.read()

    def grab_frame(self):
        if self.status:
            return self.frame
        return None  
if __name__ == '__main__':
    streamer = ThreadedCamera(0)

    while True:
        frame = streamer.grab_frame()
        if frame is not None:
            cv2.imshow("Context", frame)
        if cv2.waitKey(5) & 0xFF == 27:
            break
# capture = cv2.VideoCapture(0)
def main():
    cap = cv2.VideoCapture(0)
    # cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
    # cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
    cap.set(cv2.CAP_PROP_FPS, 30)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 2)
    
    detect = HandDetector(max_hands=1)
    present_time = 0
    click_down = False
    while cap.isOpened():
        success, image = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            # If loading a video, use 'break' instead of 'continue'.
            continue   
        image = cv2.flip(image, 1)
        image = detect.find_hands(image, True)
        landmark_list = detect.find_position(image, draw=False)
        # try:
        #     print(landmark_list[8])
        # except:
        #     pass
        
        current_time = time.time()
        fps = 1/(current_time-present_time)
        present_time = current_time
        cv2.putText(image, str(int(fps)), (30, 50), cv2.FONT_HERSHEY_COMPLEX_SMALL, 3, (255, 255, 0), 2)




        if len(landmark_list) != 0:
            x8, y8 = landmark_list[8][1:]
            x4, y4 = landmark_list[4][1:]
            x5, y5 = landmark_list[5][1:]

            pinched = detect.fingers_pinch(image)
        
        ## use landmark_list[5] , the base of index finger as mouse cursor origin

            
            gui.moveTo(x5, y5)
            if pinched:
                if click_down == False:
                    gui.mouseDown()
                    click_down = True
                pass
            elif not pinched:
                click_down = False
                gui.mouseUp()


        # Flip the image horizontally for a selfie-view display.
        cv2.imshow('MediaPipe Holistic', image)

        # 27 is escape key
        if cv2.waitKey(5) & 0xFF == 27:
            break
    cap.release()

    # capture.release()
    cv2.destroyAllWindows()

# main()










        # To improve performance, optionally mark the image as not writeable to
        # pass by reference.

        # image.flags.writeable = False
        # image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        # pose_results = pose.process(image)
        # hands_results = hands.process(image)
        # # Draw landmark annotation on the image.
        # image.flags.writeable = True
        # image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # Get landmarks
        # try:
        #     firsthand_landmarks = hands_results.multi_hand_landmarks[0]
        #     print('got landmarks of first hand! ', firsthand_landmarks)
        #     print('the type location: ', mp_hands.Hands(HandLandmark.INDEX_FINGER_TIP.value))
        # except:
        #     pass

        #  If using 2 hands | hand landmark detection does not differentiate left from right, merely order of which appear first
        # try:
        #     secondhand_landmark = hands_results.multi_hand_landmarks[1]
        #     print('got landmark second hand!')
        # except:
        #     pass


        # HANDS DETECTION
        # if hands_results.multi_hand_landmarks:
        #     for hand_landmarks in hands_results.multi_hand_landmarks:
        #         mp_drawing.draw_landmarks(
        #             image,
        #             hand_landmarks,
        #             mp_hands.HAND_CONNECTIONS,
        #             mp_drawing.DrawingSpec(color=(50,100,100), thickness=2, circle_radius=4), # points
        #             mp_drawing.DrawingSpec(color=(0,0,255), thickness=2), # lines
        #             # landmark_drawing_spec=mp_drawing_styles.get_default_hand_landmarks_style(),
        #             # connection_drawing_spec=mp_drawing_styles
        #             # .get_default_hand_connections_style()
                    
        #             )

        # FACE MESH
        # mp_drawing.draw_landmarks(
        #     image,
        #     pose_results.face_landmarks,
        #     mp_pose.FACEMESH_TESSELATION,
        #     landmark_drawing_spec=mp_drawing.DrawingSpec(),
        #     connection_drawing_spec=mp_drawing_styles
        #     .get_default_face_mesh_tesselation_style())
                
        # POSE DETECTION
        # mp_drawing.draw_landmarks(
        #     image,
        #     pose_results.pose_landmarks,
        #     mp_pose.POSE_CONNECTIONS,
        #     landmark_drawing_spec=mp_drawing_styles
        #     .get_default_pose_landmarks_style())











# # calculating angles using trig
# def get_angle(a, b, c):
#     a = np.array(a)
#     b = np.array(b)
#     c = np.array(c)

#     rad = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])




# Add this to drawing_utils.py on line 196 to have numbered points
    #   cv2.putText(image, text=f'{idx}', org=landmark_px,
    #         fontFace= cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, color=BLUE_COLOR,
    #         thickness=2, lineType=cv2.LINE_AA)