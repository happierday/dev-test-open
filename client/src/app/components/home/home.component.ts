import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    result;
    constructor(
        private router: Router,
        private homeService: HomeService
    ) { }

    ngOnInit() {
        this.homeService.getAllAthletes().subscribe(data => {
            this.result = JSON.parse(JSON.stringify(data));
        })
    }
    
    addAthlete(){
        this.router.navigate(['/addathlete']);
    }
}
