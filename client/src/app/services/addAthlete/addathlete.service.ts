import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AddathleteService {
    url = "http://localhost:8000"
    constructor(
        private httpClient: HttpClient
    ) { }

    addAthlete(body){
        return this.httpClient.post(this.url + '/addathlete',body);
    }

}
