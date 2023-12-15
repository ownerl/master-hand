import mediapipe as mp
import numpy as np
import cv2 

mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

# detecting hand adapted from Murtaza's Workshop
class HandDetector():
    def __init__(self, mode=False, max_hands=2, complexity=1, detection_confidence=0.2, track_confidence=0.5):
        self.mode = mode
        self.max_hands = max_hands
        self.complexity = complexity
        self.detection_confidence = detection_confidence
        self.track_confidence = track_confidence

        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(self.mode, self.max_hands, self.complexity, self.detection_confidence, self.track_confidence)
        self.mp_drawing = mp.solutions.drawing_utils

    def find_hands(self, image, draw):
        image.flags.writeable = False
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        hands_results = self.hands.process(image)
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        if hands_results.multi_hand_landmarks:
            for hand_landmarks in hands_results.multi_hand_landmarks:
                if draw:
                    mp_drawing.draw_landmarks(
                        image,
                        hand_landmarks,
                        self.mp_hands.HAND_CONNECTIONS,
                        mp_drawing.DrawingSpec(color=(50,100,100), thickness=2, circle_radius=4), # points
                        mp_drawing.DrawingSpec(color=(0,0,255), thickness=2), # lines
                    )
            return image
        else:
            return None
    
    def find_position(self, image, hand_number=0, draw=True, draw_index=8):
        hands_results = self.hands.process(image)
        landmark_list = []
        if hands_results.multi_hand_landmarks:
            hand_landmarks = hands_results.multi_hand_landmarks[hand_number]
            for idx, landmark in enumerate(hand_landmarks.landmark):
                # printing (idx, landmark)
                height, width, channels = image.shape
                channel_x, channel_y = int(landmark.x*width), int(landmark.y*height)
                # print(f'landmark {idx}: x: {channel_x}, y: {channel_y}')
                if draw:
                    if idx == draw_index:
                        cv2.circle(image, (channel_x, channel_y), 20, (255, 0, 255), cv2.FILLED)
                        #print('drawing index')
                landmark_list.append([idx, channel_x, channel_y])

        return landmark_list


    def fingers_pinch(self, image):
        landmark_list = self.find_position(image, draw=False)

        if len(landmark_list) != 0:
            if landmark_list[8][2] < (landmark_list[4][2] + 100) and landmark_list[8][2] > (landmark_list[4][2] - 100) and landmark_list[8][2] < (landmark_list[12][2] + 100) and landmark_list[8][2] > (landmark_list[12][2] - 100):
                if landmark_list[8][1] < (landmark_list[4][1] + 100) and landmark_list[8][1] > (landmark_list[4][1] - 100) and landmark_list[8][1] < (landmark_list[12][1] + 100) and landmark_list[8][1] > (landmark_list[12][1] - 100):
                    # print('fingers in range!')
                    return True
            else:
                pass
                # print('not in range')