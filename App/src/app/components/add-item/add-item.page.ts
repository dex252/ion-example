import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Guid } from "guid-typescript";
import { Router } from '@angular/router';

import { Recipe } from '../../models/Recipe';
import { SqlStorage } from '../../services/SqlStorage';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

    item: Recipe = new Recipe();
    
    constructor(private changeDetection: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
  }

    Add() {
        if (this.item.title != null && this.item.title.length > 0) {
            this.item.guid = Guid.create().toString();

            this.changeDetection.detectChanges();

            SqlStorage.AddRecipe(this.item).then(() => {
                this.router.navigateByUrl('/recipes');
            });

        }
    }
}
