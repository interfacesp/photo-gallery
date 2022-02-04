import { Injectable } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';  
import { Filesystem,  } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];

  constructor() { }


  public async addNewToGalery(){
    //Take photo
    const capturedPic = await Camera.getPhoto(
      {
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      }
    );

      this.photos.unshift(
        {
          filepath:"soon...", 
          webViewPath: capturedPic.webPath
        }
      );

  }
}

export interface UserPhoto {
  filepath: string; 
  webViewPath: string; 
}
