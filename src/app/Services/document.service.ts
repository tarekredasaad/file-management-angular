import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private myhttp: HttpClient) { }

  AddDocument(data: any): Observable<any> {
    return this.myhttp.post("https://localhost:44381/api/Document", data)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));;
  }
  UpdateDocument(data: any): Observable<any> {
    return this.myhttp.put("https://localhost:44381/api/Document/UpdateDocument", data)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));;
  }
  GetAllDocuments(): Observable<any> {
    return this.myhttp.get("https://localhost:44381/api/Document")
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }

  async GetDocument(id:number): Promise<Observable<any>> {
    return await this.myhttp.get(`https://localhost:44381/api/Document/GetDocument?id=${id}`)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));;
  }
   RemoveDocument(id:number): Observable<any> {
    return  this.myhttp.delete(`https://localhost:44381/api/Document/DeleteDocument?id=${id}`)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));;
  }
  downloadDocument(file:any): Observable<Blob>{
    return  this.myhttp.get(`https://localhost:44381/api/Document/download?fileName=${file}`,{ responseType: 'blob' })
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));;
  }
}
