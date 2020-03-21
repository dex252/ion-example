import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Recipe } from '../models/Recipe';

import { map, timeout } from 'rxjs/operators'
import { environment } from '../environment/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Service {
    constructor(private http: HttpClient, private transfer: FileTransfer) {
    }

    static Recipe: Recipe;

    GetToken(user: User): Observable<any> {
        return this.http.get<any>(`${environment.urlAuthApi}/token?login=${user.login}&password=${user.password}`)
            .pipe(timeout(30000), map(result => result));
    }

    Registration(login: string, password: string, name: string): Observable<number> {
        const body: any = {
            login,
            password,
            name
        }

        return this.http.post<number>(`${environment.urlAuthApi}/registration`, body)
            .pipe(timeout(30000), map(result => result));
    }

    Parse(e: HttpErrorResponse) {
        console.log(e.message);
        alert((e.message));
    }

    // TODO: example auth header for ApiServer
    //
    //    const httpOptions =
    //    {
    //        headers: new HttpHeaders(
    //            {
    //                'Authorization': `Bearer ${_user.token}`
    //            })
    //    };
    //

   
}
