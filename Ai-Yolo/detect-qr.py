from qrdet import QRDetector
import cv2

detector = QRDetector(model_size='s')

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
cap.set(3, 800)
cap.set(4, 600)



while True:
    ret, image= cap.read()

    detections = detector.detect(image=image, is_bgr=True)

    # print(detections)

    # Draw the detections
    for detection in detections:
        x1, y1, x2, y2 = detection['bbox_xyxy']
        x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2) # convert to int values
        confidence = detection['confidence']
        cv2.rectangle(image, (x1, y1), (x2, y2), color=(0, 255, 0), thickness=2)
        cv2.putText(image, f'{confidence:.2f}', (x1, y1 - 10), fontFace=cv2.FONT_HERSHEY_SIMPLEX,
                    fontScale=1, color=(0, 255, 0), thickness=2)
        

    
    cv2.imshow('Webcam', image)

    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
