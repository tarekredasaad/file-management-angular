import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private myhttp: HttpClient, private _Router: Router) { }

  // LogOut()
  // {
  // localStorage.removeItem('userToken');
  // this.currentuser.next(null);
  // this._Router.navigate(['/Login']);
  // }



  register(kero: any): Observable<any> {
    return this.myhttp.post("https://localhost:44381/api/Account/Register", kero);
  }

  login(pop: any): Observable<any> {
    return this.myhttp.post("https://localhost:44381/api/Account/Login", pop)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));;
  }
}
