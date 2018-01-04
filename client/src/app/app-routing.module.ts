import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddAthleteComponent } from './components/add-athlete/add-athlete.component';

const appRoutes: Routes = [
    {
        path:  '',
        component: HomeComponent,
    },
    {
        path: 'addathlete',
        component: AddAthleteComponent
    },
    {
        path: 'profile/:username',
        component: ProfileComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,{useHash:environment.useHash})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{
    
}