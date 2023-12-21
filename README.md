# Master Hand

A demonstration of computer vision hand tracking used to navigate a 3d environment and access information and links. Created specifically as a module for my portfolio.


## Project Goal

The goal of this project was to jump into and learn a completely new technology in the span of a week. Initially, I started this as a Python project for easier implementation of computer vision and AI training. The early goal was to implement face tracking and overlaying a 2D image overtop of it like a mask, however, due to time constraints, I was unable to accomplish the latter within my allotted timeframe. Instead, I swapped to hand tracking as it used fewer control points and was simpler to extrapolate useful information that I could then translate into actionable functions. At the same time, I was hoping to combine this with React in a MERN style web-app format with the back end handling everything. Combining the existing structure of create-react-app with Python backend proved troublesome so I moved over to using TensorFlow's JavaScript specific version of MediaPipe's computer vision to seamlessly marry it into React. 

For the practical application of hand tracking, I decided to learn Three.js to provide a base on which I could showcase the use of computer vision. The most difficult part of this process was translating hand tracking data received from a separate module into useful inputs that could be interpreted by Three.js. Through lots of trial and error, as well as restarting some features multiple times, I was able to get hand based 3d navigation in the form rotation working, as well as hovering over specific points to display information and open links.

## Tech Stack

- JS/HTML
- React
- TensorFlow.js/MediaPipe
- Three.js
- Framer Motion
- React Webcam

## Takeaways

Even though I ended up scrapping the Python portion of the project, I learned a lot about how the computer vision technology works, and how I might configure it for my usage. The open source OpenCV library was especially enlightening, and also incredible deep as I only scratched the surface with my preliminary explorations into face and hand tracking. Future exploration of it in future projects is a definite thing 😄. 

Prior to the project, I was not too fond of front-end CSS work, however, thanks to Three.js, I now see endless possibilities through the inclusion of interactive 3D elements. This meshes especially well since I have prior experience as a 3D modeller and texture artist for game assets! 

## Screenshots

To be placed here after presentation:

# Project Pitch

Create a web-app that utilizes MediaPipe's pose tracking system to control and navigate using hand gestures and motions. The primary goal will be to properly receive and execute functions based on gestures. This will require creating a data set and training a model to recognize these gestures and/or manually creating point based gesture groups and matching them to the hand's points.

## Tech Stack

- JS
- Python
- MediaPipe
- OpenCV

## Sprints/Daily Goals

- Learn to create dataset
- Train AI to recognize gestures from the dataset
- Allow AI to execute functions based on recognized gestures
- Create rudimentary web-app to feature the hand tracking system
- ???
- Profit

## Wireframes

![literally wireframe](<public/Screenshot 2023-12-13 at 1.00.13 PM.png>)