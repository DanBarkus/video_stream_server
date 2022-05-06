import cv2
# import os
import time
from flask import Flask, render_template, Response

app = Flask(__name__)

URL_1 = "http://192.168.1.61:81/stream"
URL_2 = "http://192.168.1.62:81/stream"
URL_3 = "http://192.168.1.64:81/stream"
PATH = "./images/001/"
im_num = 0
CAPTURING = False

last_image = time.time()
last_save = time.time()
interval = 10

# while(True):
#     ret, frame = capture_1.read()
#     # cv2.imshow('image',frame)
#     last_image = time.time()
#     if last_image - last_save > interval and CAPTURING:
#         frame_num = str(im_num).zfill(5)
#         cv2.imwrite(PATH+frame_num+'.jpg',frame)
#         im_num += 1
#         last_save = time.time()
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         cv2.destroyAllWindows()
#         break


@app.route('/')
def index():
    return render_template('index.html')

def gen(camera):
    while True:
        ret, frame = camera.read()
        _, image = cv2.imencode('.jpeg', frame)
        image = image.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + image + b'\r\n')

@app.route('/video_feed/<num>')
def video_feed(num):
    if num == "0":
        capture = cv2.VideoCapture(URL_1)
    elif num == "1":
        capture = cv2.VideoCapture(URL_2)
    elif num == "2":
        capture = cv2.VideoCapture(URL_3)

    return Response(gen(capture),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port='5001')