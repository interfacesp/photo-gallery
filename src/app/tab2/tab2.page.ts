import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService, UserPhoto} from '../services/photo.service'; 


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService:PhotoService, 
              public actionSheetController: ActionSheetController) {}


  async ngOnInit(){
      await this.photoService.loadSaved();
  }
   
   addPhotoToGallery(){
     this.photoService.addNewToGalery(); 
   }

   public async showActionSheet(aPhoto: UserPhoto, position: number){
    
        const actionSheet = await this.actionSheetController.create(
          {
            header: 'Photos Actions',
            buttons: [
              {
                //todo action delete
                text:'Delete',
                role: 'destructive',
                icon: 'trash',
                handler: () => {
                  //todo call delete
                  this.photoService.deletePicture(aPhoto, position); 
                }
              }, 
              {
                //todo action cancel
                text: 'Cancel',
                icon: 'close', 
                role: 'cancel',
                handler: () => {
                  //do nothing => Action sheet utomatically closes
                }
              }
            ] 
          }
        ); 

        await actionSheet.present();
   }

  



}
