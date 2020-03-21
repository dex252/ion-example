import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient/* HTTP_INTERCEPTORS*/ } from '@angular/common/http';
import { Service } from './services/Service';
import { Media } from '@ionic-native/media/ngx';
import { DatePipe } from '@angular/common';
import { File } from '@ionic-native/file/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Platform } from '@ionic/angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        HttpClientModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule],

    providers: [
        Media,
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        HttpClient,
        Service,
        DatePipe,
        File,
        Base64,
        Platform,
        FileTransfer,
        FileTransferObject,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
