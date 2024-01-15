import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../Services/document.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {

  constructor(private fb:FormBuilder,private documentSevice:DocumentService
    ,private activerout:ActivatedRoute) {
  }
  AddForm: any=this.fb.group({
    id:0,
    name:['',[Validators.required]],
    // priorityName:['',[Validators.required]],
    priorityLevel:['',[Validators.required]],
    file_Path:['',[Validators.required]],
  });
  selectedFiles!: FileList | null;
  selectedFile!:File
  fileExtension!:string
    Priority:any[] =[
    "low","high","critical"
  ]
  imageEx:string[]=['jpg', 'png', 'gif']

  document:any
  parms!:ParamMap
  docId!:any
  list:File[]=[]
  // AddForm!:FormGroup;
  get name(){
    return this.AddForm.get('name');
  }
  get id(){
    return this.AddForm.get('id');
  }
  get priorityName(){
    return this.AddForm.get('priorityName');
  }
  get priorityLevel(){
    return this.AddForm.get('priorityLevel');
  }
  async ngOnInit(): Promise<void>{
     this.activerout.paramMap.subscribe((parm: ParamMap) => {
      this.docId = parm.get("id")
      console.log(this.docId);
    });

   (await this.documentSevice.GetDocument(this.docId)).subscribe({
      next: data => {
        console.log(data)
        console.log(data.result)
       this.document = data.result.data;
       
       console.log(this.document);
       this.AddForm.patchValue({
        id : this.document.id,
        name:this.document.name,
        priorityLevel:this.document.priorityLevel,
        // file_Path:this.document.file_Path,
       })
       this.fileExtension = this.document.priorityName.split('.').pop()
        // this.fileExtension = this.document.priorityName.split('.').pop()
        // console.log(this.fileExtension)
      
      
        
    },
      error: err => console.log(err),
    })
  
  }
  submitData(data:FormGroup){
    const formData = new FormData();
    // formData = data
  formData.append('id', this.AddForm.get("id").value);
  formData.append('name', this.AddForm.get("name").value);
  // formData.append('priorityName', this.AddForm.get("priorityName").value);
  formData.append('priorityLevel', this.AddForm.get("priorityLevel").value);
  if(this.selectedFile != null){

    formData.append('file_Path',  this.selectedFile,this.selectedFile.name);
  }
    console.log(data.value)
    console.log(formData.get('priorityLevel'))
    this.documentSevice.UpdateDocument(formData).subscribe({
      next: data => {
        console.log(data)
       
        
        
       
      
  
    },
      error: err => console.log(err),

    })
  }
  onFileSelected(event: any): void {
    if(!this.fileExtension.includes( event.target.files[0].name.split('.').pop())){
      window.alert("warning this file may insecure")
      console.log("warning this file may insecure")
      location.reload();
    }
    if(event.target.files[0].size < 5 * 1024 *1024  ){
      const selectedFiles = event.target.files;
      this.selectedFile = <File>event.target.files[0];
      this.selectedFiles = event.target.files;
      console.log('Selected Files:', this.selectedFiles);
      for(let file of event.target.files){
        // this.selectedFiles
        this.list.push({
          name: file.name,
          type: file.type,
          lastModified: file.lastModified,
          webkitRelativePath: file.webkitRelativePath,
          size: file.size,
          arrayBuffer: function (): Promise<ArrayBuffer> {
            throw new Error('Function not implemented.');
          },
          slice: function (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob {
            throw new Error('Function not implemented.');
          },
          stream: function (): ReadableStream<Uint8Array> {
            throw new Error('Function not implemented.');
          },
          text: function (): Promise<string> {
            throw new Error('Function not implemented.');
          }
        })
      }
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
