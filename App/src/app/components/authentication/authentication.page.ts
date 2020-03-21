import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';

import { User } from '../../models/User'
import { Service } from '../../services/Service';
import { SqlStorage } from '../../services/SqlStorage';

@Component({
    selector: 'app-root',
    templateUrl: 'authentication.page.html',
    styleUrls: ['authentication.page.scss'],
})

export class AuthenticationPage {
    login: string;
    pass: string;

    disabled: boolean = true;

    constructor(private Service: Service, private router: Router, private changeDetection: ChangeDetectorRef, private platform: Platform) {
        this.platform.ready().then(() => {

            SqlStorage.OpenDb().then(() => {

                SqlStorage.GetUser().then((user: User) => {
                    if (user != null) {
                        this.login = user.login;
                        this.pass = user.password;

                        this.changeDetection.detectChanges();

                        this.Service.GetToken(user).subscribe(token => {
                            user.token = token;
                            SqlStorage.SaveUser(user).then(e => {
                                this.disabled = false;
                                if (e == true) {
                                    this.router.navigateByUrl('/recipes');
                                }
                            });
                        },
                            (e: HttpErrorResponse) => {
                                Service.Parse(e);
                                this.disabled = false;
                            });
                    } else {
                        this.disabled = false;
                    }
                }).catch(e => {
                    this.disabled = false;
                });
            });
        });
    }

    GetToken() {
        this.disabled = true;

        let user = new User(this.login, this.pass);
        this.Service.GetToken(user).subscribe(token => {
                user.token = token;
                SqlStorage.SaveUser(user).then(e => {
                this.disabled = false;
                if (e == true) {
                        this.router.navigateByUrl('/recipes');
                    } else {
                        alert('Error db');
                    }
            });
        },
            (e: HttpErrorResponse) => {
                alert(e.message);
                this.disabled = false;
            });
    }

    Registration() {
        this.router.navigateByUrl('/registration');
    }

    Auto() {
        this.router.navigateByUrl('/recipes');
    }
}

