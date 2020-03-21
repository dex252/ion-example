import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        loadChildren: './components/authentication/authentication.module#AuthenticationPageModule'
    },
    { path: 'recipes', loadChildren: './components/recipes/recipes.module#RecipesPageModule' },
    { path: 'registration', loadChildren: './components/registration/registration.module#RegistrationPageModule' },
    { path: 'add-item', loadChildren: './components/add-item/add-item.module#AddItemPageModule' },
    { path: 'select-item', loadChildren: './components/select-item/select-item.module#SelectItemPageModule' },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
