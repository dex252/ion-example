import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Service } from '../../services/Service';
import { SqlStorage } from '../../services/SqlStorage';
import { Recipe } from '../../models/Recipe';

@Component({
    selector: 'app-select-item',
    templateUrl: './select-item.page.html',
    styleUrls: ['./select-item.page.scss'],
})
export class SelectItemPage implements OnInit {

    item: Recipe;

    constructor(private changeDetection: ChangeDetectorRef, private router: Router) {
        this.item = Service.Recipe;
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        console.log(this.item.title);
        this.changeDetection.detectChanges();
    }

    Delete() {
        SqlStorage.DeleteRecipe(this.item).then(() => {
            this.router.navigateByUrl('/recipes');
        });
    }
}
