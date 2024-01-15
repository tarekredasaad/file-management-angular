import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../Services/document.service';
import { ActivatedRoute, ParamMap, Params, Router, convertToParamMap } from '@angular/router';

@Component({
  selector: 'app-document-info',
  templateUrl: './document-info.component.html',
  styleUrls: ['./document-info.component.scss']
})
export class DocumentInfoComponent implements OnInit {

  constructor(private documentSevice:DocumentService
    ,private activerout: ActivatedRoute,private route:Router
    ) { }
    imageEx:string[]=['jpg', 'png', 'gif']
    docEx:string[]=['pdf', 'doc', 'xls', 'txt', 'zip', 'mp3', 'mp4']
    fileExtension!:string
  document:any
  parms!:ParamMap
  docId!:any
   async ngOnInit(): Promise<void> {
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
        this.fileExtension = this.document.priorityName.split('.').pop()
        console.log(this.fileExtension)
       if( this.imageEx.includes(this.fileExtension)){
        console.log("this image")
      }else{
        console.log("this not image")
      }
      
        
    },
      error: err => console.log(err),
    })
  }

}
