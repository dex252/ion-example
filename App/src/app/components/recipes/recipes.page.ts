import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Service } from '../../services/Service';
import { SqlStorage } from '../../services/SqlStorage';
import { Recipe } from '../../models/Recipe';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.page.html',
    styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

    collection: Recipe[] = [];
    disabled: boolean = false;

    constructor(private changeDetection: ChangeDetectorRef, private router: Router) {
       
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        console.log('Enter');
        SqlStorage.GetCollection().then((data: Recipe[]) => {
            this.collection = data;
            this.changeDetection.detectChanges();
        });
    }

    Refresh() {
        // TODO: next time
    }

    Add() {
        this.router.navigateByUrl('/add-item');
    }

    SelectItem(item: Recipe) {
        Service.Recipe = item;
        setTimeout(() => {
            this.router.navigateByUrl('/select-item');
        }, 50);
    }

}
