import { Injectable } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';  
import { Directory, Filesystem,  } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { __makeTemplateObject } from 'tslib';


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
        quality: 100 //from 0 > 100
      }
    );


    const savedImage =await this.savePicture(capturedPic); 
    
    // Add photo to the in-memory array

    const takenUserPhoto ={
      filepath: savedImage.filepath,
      webViewPath: savedImage.webViewPath
    }; 

    this.photos.unshift(takenUserPhoto);

  }

  private async savePicture(aPhoto: Photo){
      //convert photo to base64 format, required by Filesystem API
      const base64Data = await this.readAsBase64(aPhoto);

      //Write file to data directory
      const fileName= new Date().getTime() + "espoir" + ".jpeg";
      
      await Filesystem.writeFile({
        path: fileName, 
        data: base64Data,
        directory: Directory.Documents
        }
      ); 

      // console.log("File written with name" + fileName );
      return {
        filepath: fileName,
        webViewPath: aPhoto.webPath
      }

  }

  private async readAsBase64(aPhoto: Photo) {
    // Fetch a photo ,read as a blob and convert to base64
    const response = await fetch(aPhoto.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) =>  new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
      }
  );



}

export interface UserPhoto {
  filepath: string; 
  webViewPath: string; 
}
