import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { AllDocumentComponent } from './all-document/all-document.component';
import { DocumentInfoComponent } from './document-info/document-info.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';

const routes: Routes = [
  {path: 'Register',component:RegisterComponent},
  {path: 'login',component:LoginComponent},
  {path: 'Add',component:AddDocumentComponent},
  {path: 'All',component:AllDocumentComponent},
  {path: 'document/:id',component:DocumentInfoComponent},
  {path: 'documentEdit/:id',component:DocumentEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
