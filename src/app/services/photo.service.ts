import { Injectable } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';  
import { Directory, Filesystem,  } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  

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

    Storage.set(
      {
        key: this.PHOTO_STORAGE, 
        value: JSON.stringify(this.photos),
      }
    );

  }

  public async loadSaved(){
      const photoList = await Storage.get({
        key: this.PHOTO_STORAGE
      });

      this.photos = JSON.parse(photoList.value) || []; 


      //Copied from Ionic framwework doc -tutorial 
      // Display the photo by reading into base64 format
      for (let aPhoto of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: aPhoto.filepath,
          directory: Directory.Data,
        });

        // Web platform only: Load the photo as base64 data
        aPhoto.webViewPath = `data:image/jpeg;base64,${readFile.data}`;
      }

  }

  private async savePicture(aPhoto: Photo){
      //convert photo to base64 format, required by Filesystem API
      const base64Data = await this.readAsBase64(aPhoto);

      //Write file to data directory
      const fileName= new Date().getTime() + "espoir" + ".jpeg";
      
      await Filesystem.writeFile({
        path: fileName, 
        data: base64Data,
        directory: Directory.Data
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
    const response = await fetch(aPhoto.webPath!);
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
