import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicStorageModule.forRoot({
            name: 'database',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        RouterModule.forChild([
            {
                component: SqlStorage
            }
        ])
    ],
    providers: [SQLite],
    declarations: [SqlStorage]
})

export class SqlStorage { }