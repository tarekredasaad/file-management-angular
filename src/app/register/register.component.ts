import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthorizeService } from '../Services/authorize.service';
import { ConfirmPasswordValidator } from '../Validation/regestrationValidation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private fb:FormBuilder,private Auth:AuthorizeService,private rote:Router){}
  selectedFile!: File;
  
  RegisterationForm = this.fb.group({
    name:['',[Validators.required,Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
   email:['',[Validators.required,Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z]+\.[A-Za-z]+$')]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',[Validators.required,Validators.minLength(6)]],
    address: ['' , [Validators.required]],

    },{validator:[ConfirmPasswordValidator]});

   

 get name(){
    return this.RegisterationForm.get('name');
  }
 
  get yourEmail(){
    return this.RegisterationForm.get('email');
  }
  get Address(){
    return this.RegisterationForm.get('address');
  }
  get yourPassword(){
    return this.RegisterationForm.get('password');
  }
  get ConfirmPassword(){
    return this.RegisterationForm.get('confirmPassword');
  }

 
 
  async submitData(data:any){
    
    
       console.log(data.value)
      
      this.Auth.register(data.value).subscribe({next: data => {
        console.log(data)
       
        
        this.rote.navigate(['/login']);
       
      
  
      },
        error: err => console.log(err),
    })
  
    }

  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    console.log(this.selectedFile)
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    dataTransfer.items.add(new File(['my-file'], 'new-file-name'));
    const inputElement: HTMLInputElement = document.getElementById('formFile') as HTMLInputElement

  inputElement.files = dataTransfer.files;
  }


 ngOnInit(): void {
   
 }

}
