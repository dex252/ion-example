import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/http';
import { Router } from '@angular/router';

import { Service } from '../../services/Service';
import { SqlStorage } from '../../services/SqlStorage';
import { User} from '../../models/User';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    disabled: boolean = false;
    login: string = "";
    name: string = "";
    password: string = "";

    constructor(private Service: Service, private router: Router, private changeDetection: ChangeDetectorRef) { }

    ngOnInit() {
    }

    Registration() {

        this.changeDetection.detectChanges();
        if (this.login != null && this.login.length > 0) {
            if (this.password != null && this.password.length > 0) {
                if (this.name != null && this.name.length > 0) {
                    this.disabled = true;
                    this.Service.Registration(this.login, this.password, this.name).subscribe((e: number) => {
                        if (e > -1) {
                            let user = new User(this.login, this.password);

                            this.Service.GetToken(user).subscribe((token: string) => {
                                    user.id = e;
                                    user.token = token;

                                    SqlStorage.SaveUser(user).then(e => {
                                        if (e) {
                                            this.disabled = false;
                                            this.router.navigateByUrl('/recipes');
                                        } else {
                                            this.disabled = false;
                                            this.router.navigateByUrl('/authentication');
                                        }
                                    });
                                },
                                (e: HttpErrorResponse) => {
                                    this.disabled = false;
                                    alert(e.message);
                                    this.router.navigateByUrl('/authentication');
                                });

                        } else {
                            this.disabled = false;
                            alert('This login already is exist');
                        }
                    }, (e: HttpErrorResponse) => {
                            this.disabled = false;
                        alert(e.message);
                    });
                }
            }
        }
    }
}
