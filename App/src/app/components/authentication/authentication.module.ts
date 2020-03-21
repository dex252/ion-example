import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthenticationPage } from './authentication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthenticationPage
      }
    ])
  ],
providers:[],
  declarations: [AuthenticationPage],
  exports: [RouterModule]
})

export class AuthenticationPageModule {}