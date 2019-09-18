import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router"
import{appRoutes} from "./routes"
import {NgxGalleryModule} from "ngx-gallery"
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import {NgxEditorModule} from "ngx-editor"
import {FileUploadModule} from "ng2-file-upload"




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CityComponent } from './city/city.component';
import { HttpClientModule }    from '@angular/common/http';
import { from } from 'rxjs';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { CityAddComponent } from './city-add/city-add.component';
import   {AlertifyService} from "./services/alertify.service"
import { RegisterComponent } from './register/register.component';
import { PhotoComponent } from './photo/photo.component';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      CityComponent,
      CityDetailComponent,
      CityAddComponent,
      RegisterComponent,
      PhotoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FormsModule,
      ReactiveFormsModule,
      NgxEditorModule,
      FileUploadModule
   ],
   providers: [
      AlertifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
