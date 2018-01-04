import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {
    url = "http://localhost:8000"
    constructor(
        private httpClient: HttpClient
    ) { }
    getAllAthletes(){
        return this.httpClient.get(this.url + '/');
    }
}
