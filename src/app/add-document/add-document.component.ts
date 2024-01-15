import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../Services/document.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  constructor(private fb:FormBuilder,private documentSevice:DocumentService
    ,private activerout:ActivatedRoute) {
  }
  UserId:any
  AddForm: any=this.fb.group({
    name:['',[Validators.required]],
    userId:"0",
    priorityLevel:['',[Validators.required]],
    file_Path: ['',[Validators.required]],
  });
  selectedFiles!: FileList | null;
  selectedFile!:File
  fileExtension:string[]=['jpg', 'png','jfif', 'gif', 'pdf', 'doc','docx', 'xls', 'txt', 'zip', 'mp3', 'mp4']
  Priority:any[] =[
    "low","high","critical"
  ]
  list:File[]=[]
  // AddForm!:FormGroup;
  get name(){
    return this.AddForm.get('name');
  }
  get userId(){
    return this.AddForm.get('userId');
  }
  get priorityLevel(){
    return this.AddForm.get('priorityLevel');
  }
  ngOnInit(): void {
    this.activerout.paramMap.subscribe((parm: ParamMap) => {
      this.UserId = parm.get("id")
      console.log(this.UserId);
    });
  }
  async submitData(data:FormGroup){
    for(let file of this.list){
      const formData = new FormData();
      this.selectedFile = file
      this.AddForm.get('file_Path').value = file;
      formData.append('file_Path', file,file.name);
      // formData = data
    formData.append('name', this.AddForm.get("name").value);
    formData.append('userId', this.UserId);
    formData.append('priorityLevel', this.AddForm.get("priorityLevel").value);
    console.log(file)
    console.log(file.name)
      console.log(data.value)
      console.log(formData.get('file_Path'))
      console.log(formData.get('priorityLevel'))
     
     await this.documentSevice.AddDocument(formData).subscribe({
        next: data => {
          console.log(data)
         
          var message = document.getElementById("message")
          if(message != null){

            message.innerHTML=`${data.result.data} your Document has been Added successfully`
          }
          
         
        
    
      },
        error: err => console.log(err),
  
      })
    }
  }
  onFileSelected(event: any): void {
    const files = event.target.files;

    if(!this.fileExtension.includes( event.target.files[0].name.split('.').pop())){
      window.alert("warning this file may insecure")
      console.log("warning this file may insecure")
      location.reload();
    }
    if(event.target.files[0].size < 5 * 1024 *1024  ){
      const selectedFiles = event.target.files;
      

    // Add the selected files to the FormArray
    
      this.selectedFile = <File>event.target.files[0];
      this.selectedFiles = event.target.files;
      console.log('Selected Files:', this.selectedFiles);
      this.list = event.target.files;
      
      console.log(this.list)
      // Process the selected files
      this.processFiles(selectedFiles);
    }else{

      console.log("this file is larger than maximum size 5 mg")
    }
  }

  processFiles(files: FileList | null): void {
    if (files) {
      console.log(files);
      
      for (let i = 0; i < files.length; i++) {
        const file: File = files.item(i)!;
        console.log('Selected File:', file.name);
        // Perform any additional processing or upload logic here
      }
    }
  }
}
