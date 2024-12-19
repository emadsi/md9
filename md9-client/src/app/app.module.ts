import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { CancelPageComponent } from './pages/cancel-page/cancel-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { AdminService } from './services/admin/admin.service';
import { ReservationService } from './services/reservation/reservation.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FieldReservationComponent } from './components/field-reservation/field-reservation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    ReservationPageComponent,
    PaymentPageComponent,
    CancelPageComponent,
    AdminPageComponent,
    ReservationFormComponent,
    PaymentFormComponent,
    LoginPageComponent,
    FieldReservationComponent,    
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    AdminService,
    ReservationService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
