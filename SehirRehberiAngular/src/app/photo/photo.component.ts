import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AlertifyService } from '../services/alertify.service'
import { AuthService } from '../services/auth.service'
import { ActivatedRoute } from '@angular/router'
import { Photo } from '../models/photo'

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private authService: AuthService,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute) { }

  photos: Photo[] = []
  uploader: FileUploader
  hasBaseDropZoneOver = false;
  baseUrl = 'http://localhost:64984/api/';
  currentMain: Photo;
  CurrentCity: any;

  ngOnInit() {

    this.activatedRoute.params.subscribe(params=>{
      this.CurrentCity=params["cityId"]
    })

    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'cities/' + this.CurrentCity + '/photos',
      authToken: 'Bearer' + this.authService.token,
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    })

    
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description="dfdsdsd",
          isMain: res.isMain,
          cityId: res.cityId
        }
        this.photos.push(photo)
      }
    }
  }



}
