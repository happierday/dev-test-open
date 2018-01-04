import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AddathleteService } from './services/addAthlete/addathlete.service';
import { HomeService } from './services/home/home.service';
import { ProfileService } from './services/profile/profile.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddAthleteComponent } from './components/add-athlete/add-athlete.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        AddAthleteComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        AddathleteService,
        HomeService,
        ProfileService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
