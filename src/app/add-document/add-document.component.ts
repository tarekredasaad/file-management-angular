import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../Services/document.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  constructor(private fb:FormBuilder,private documentSevice:DocumentService) {
  }
  AddForm: any=this.fb.group({
    name:['',[Validators.required]],
    priorityName:['',[Validators.required]],
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
  get priorityName(){
    return this.AddForm.get('priorityName');
  }
  get priorityLevel(){
    return this.AddForm.get('priorityLevel');
  }
  ngOnInit(): void {
  }
  async submitData(data:FormGroup){
    for(let file of this.list){
      const formData = new FormData();
      this.selectedFile = file
      this.AddForm.get('file_Path').value = file;
      formData.append('file_Path', file,file.name);
      // formData = data
    formData.append('name', this.AddForm.get("name").value);
    // formData.append('priorityName', this.AddForm.get("priorityName").value);
    formData.append('priorityLevel', this.AddForm.get("priorityLevel").value);
    console.log(file)
    console.log(file.name)
      console.log(data.value)
      console.log(formData.get('file_Path'))
      console.log(formData.get('priorityLevel'))
     
     await this.documentSevice.AddDocument(formData).subscribe({
        next: data => {
          console.log(data)
         
          
          
         
        
    
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
      // for(let file of event.target.files){
      //   // this.selectedFiles
      //   this.list.push({
      //     name: file.name,
      //     type: file.type,
      //     lastModified: file.lastModified,
      //     webkitRelativePath: file.webkitRelativePath,
      //     size: file.size,
      //     arrayBuffer: function (): Promise<ArrayBuffer> {
      //       throw new Error('Function not implemented.');
      //     },
      //     slice: function (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob {
      //       throw new Error('Function not implemented.');
      //     },
      //     stream: function (): ReadableStream<Uint8Array> {
      //       throw new Error('Function not implemented.');
      //     },
      //     text: function (): Promise<string> {
      //       throw new Error('Function not implemented.');
      //     }
      //   })
      // }
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
