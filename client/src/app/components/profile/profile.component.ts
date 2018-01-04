import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { FormControl, FormGroup, FormBuilder , Validators} from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    result;
    athleteForm: FormGroup
    editStatue = false;
    message;
    messageClass;
    @ViewChild("fileInput") fileInput;
    constructor(
        private router: Router,
        private profileService: ProfileService,
        private formBuilder: FormBuilder
    ) {
        this.createForm()
     }

    ngOnInit() {
        this.profileService.getAthleteDetail(this.router.url.split('/')[2]).subscribe(data => {
            this.result = JSON.parse(JSON.stringify(data)).data;
            console.log(this.result);
        })
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

    editProfile(){
        this.athleteForm.get('firstName').setValue(this.result.firstName);
        this.athleteForm.get('lastName').setValue(this.result.lastName);
        this.athleteForm.get('nationality').setValue(this.result.nationality);
        this.athleteForm.get('association').setValue(this.result.association);
        this.athleteForm.get('team').setValue(this.result.team);
        this.athleteForm.get('gender').setValue(this.result.gender);
        this.athleteForm.get('sports').setValue(this.result.sports);
        this.athleteForm.get('about').setValue(this.result.about);
        this.editStatue = true;
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
                this.profileService.updateAthlete(body,this.router.url.split('/')[2]).subscribe(data => {
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
        }else{
            let body = {
                firstName: this.athleteForm.get('firstName').value,
                lastName: this.athleteForm.get('lastName').value,
                nationality: this.athleteForm.get('nationality').value,
                association: this.athleteForm.get('association').value,
                team: this.athleteForm.get('team').value,
                gender: this.athleteForm.get('gender').value,
                sports: this.athleteForm.get('sports').value, 
                about: this.athleteForm.get('about').value,
                img: this.result.img
            }
            this.profileService.updateAthlete(body,this.router.url.split('/')[2]).subscribe(data => {
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
        }
    }
}
