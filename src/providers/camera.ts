import { Injectable } from '@angular/core';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CameraProvider {
    constructor(private camera: Camera) {
    }

    takePhoto() {
        return Observable.create(observer => {
            const options: CameraOptions = {
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                cameraDirection: this.camera.Direction.FRONT
            }
            
            this.camera.getPicture(options).then((imageData) => {
                let base64Image = 'data:image/jpeg;base64,' + imageData;

                observer.next(base64Image);
                observer.complete();
            }, (err) => {
                observer.error(err);
            });
        })
    }

}
