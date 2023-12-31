import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideBarComponent } from './pages/dashboard/side-bar/side-bar.component';
import { MainContentComponent } from './pages/dashboard/main-content/main-content.component';
import { TopUpComponent } from './pages/dashboard/top-up/top-up.component';
import { TransferComponent } from './pages/dashboard/transfer/transfer.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../../enviroments/environments';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { TopUpFormComponent } from './components/top-up-form/top-up-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { TransferUserComponent } from './components/transfer-user/transfer-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    DashboardComponent,
    SideBarComponent,
    MainContentComponent,
    TopUpComponent,
    TransferComponent,
    HeaderComponent,
    LayoutComponent,
    TopUpFormComponent,
    TransferUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
