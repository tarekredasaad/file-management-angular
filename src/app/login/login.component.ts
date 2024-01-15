import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizeService } from '../Services/authorize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!:FormGroup;
  constructor(private fb:FormBuilder,private Auth:AuthorizeService,private rout:Router){
    this.LoginForm=fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    });
   
  }

  get email(){
    return this.LoginForm.get('email');
  }
  get password(){
    return this.LoginForm.get('password');
  }
  error:string='';

  ngOnInit(): void {
  }
  submitData(data:FormGroup){
    console.log(data.value);
    this.Auth.login(data.value).subscribe({
      next: data => {
            console.log(data)
           if(data.statusCode == 200){

             this.rout.navigate([`/All/${data.data.id}`]);
           }else{
            var alert = document.getElementById("alert");
            if(alert != null){

               alert.innerHTML = ` wrong email or password`
            }
            // window.alert("wrong email or password ")
           }
            
           
          
      
        },
          error: err => console.log(err),
    }
    )
  }
}
