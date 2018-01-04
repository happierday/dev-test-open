import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder , Validators} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { AddathleteService } from '../../services/addAthlete/addathlete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-athlete',
  templateUrl: './add-athlete.component.html',
  styleUrls: ['./add-athlete.component.css']
})
export class AddAthleteComponent implements OnInit {
    athleteForm: FormGroup;
    @ViewChild("fileInput") fileInput;
    result;
    message;
    messageClass;
    constructor(
        private formBuilder: FormBuilder,
        private addathleteService: AddathleteService,
        private router: Router
    ) {
        this.createForm();
    }
    
    ngOnInit() {
    }

    createForm(){
        this.athleteForm = this.formBuilder.group({
            firstName: ['',Validators.compose([
                Validators.required,])],
            lastName: ['',Validators.compose([
                Validators.required,])],
            nationality: ['',Validators.compose([
                Validators.required,])],
            association: ['',Validators.compose([
                Validators.required,])],
            team: ['',Validators.compose([
                Validators.required,])],
            gender: ['',Validators.compose([
                Validators.required,])],
            sports: ['',Validators.compose([
                Validators.required,])],
            about: ['',Validators.compose([
                Validators.required,])]
        })
    }
    
    onSubmit(){
        let file = this.fileInput.nativeElement;
        if(file.files && file.files[0]){
            let fr = new FileReader();
            fr.readAsDataURL(file.files[0]);
            fr.onload = (() => {
                let body = {
                    firstName: this.athleteForm.get('firstName').value,
                    lastName: this.athleteForm.get('lastName').value,
                    nationality: this.athleteForm.get('nationality').value,
                    association: this.athleteForm.get('association').value,
                    team: this.athleteForm.get('team').value,
                    gender: this.athleteForm.get('gender').value,
                    sports: this.athleteForm.get('sports').value, 
                    about: this.athleteForm.get('about').value,
                    img: fr.result
                }
                this.addathleteService.addAthlete(body).subscribe(data => {
                    this.result = JSON.parse(JSON.stringify(data));
                    this.message = this.result.msg;
                    if(this.result.success){
                        this.messageClass = "alert alert-success";
                        setTimeout(() => {
                            this.router.navigate(['/']);
                        }, 2000);
                    }else{
                        this.messageClass = "alert alert-danger";
                    }
                })
            })
        }
    }
}
