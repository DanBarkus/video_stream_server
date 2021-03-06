import cv2
import os
import time
import re
import json
from flask import Flask, render_template, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PATH = "Z:/My Videos/esp_lapses/Day 2/images/"
CAMERAS_FILE = "../config/cameras.json"
CAMERAS = []
im_num = 0
CAPTURING = False

last_image = time.time()
last_save = time.time()
interval = 10

def extract_number(f):
    s = re.findall("\d+", f)
    return (int(s[0]) if s else -1)

def get_cameras():
    with open(CAMERAS_FILE, 'r') as cf:
        cameras = json.load(cf)
        cameras = cameras["Cameras"]
    return(cameras)

CAMERAS = get_cameras()

@app.route('/')
def index():
    return render_template('index.html')

def gen(camera, folder):
    if CAPTURING:
        im_num = 0
        last_num = 0
        for filename in os.listdir(PATH+str(folder)):
            f = filename
            last_num = extract_number(f)
            if last_num > im_num:
                im_num = last_num
        im_num += 1
        print(im_num)
    while True:
        ret, frame = camera.read()
        if(ret):
            if CAPTURING:
                frame_num = str(im_num).zfill(6)
                cv2.imwrite(PATH+str(folder)+'/'+frame_num+'.jpg',frame)
                im_num += 1
            _, image = cv2.imencode('.jpeg', frame)
            image = image.tobytes()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + image + b'\r\n')

@app.route('/video_feed/<num>')
def video_feed(num):
    camera = next(cam for cam in CAMERAS if cam["ID"] == num)
    url = "http://"+ camera["Address"] + ":81/stream"
    folder = camera["ID"].zfill(3)
    capture = cv2.VideoCapture(url)

    return Response(gen(capture, folder),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/cameras')
def return_cameras():
    return Response(json.dumps(CAMERAS))

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port='5001')