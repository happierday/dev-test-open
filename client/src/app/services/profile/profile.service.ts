import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {

    url = "http://localhost:8000"
    constructor(
        private httpClient: HttpClient
    ) { }
    
    getAthleteDetail(params){
        return this.httpClient.get(this.url + '/profile/'+params);
    }

    updateAthlete(body,params){
        return this.httpClient.put(this.url + '/profile/'+params,body);
    }

}
