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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TimeslotComponent } from './components/timeslot/timeslot.component';
import { ConfirmationNumberComponent } from './components/confirmation-number/confirmation-number.component';
import { ViewReservationsComponent } from './components/view-reservations/view-reservations.component';
import { BlockTimeslotsComponent } from './components/block-timeslots/block-timeslots.component';
import { AddTimeslotsComponent } from './components/add-timeslots/add-timeslots.component';
import { ConfirmPaymentsComponent } from './components/confirm-payments/confirm-payments.component';

import { BlockDialogComponent } from './components/block-dialog/block-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


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
    TimeslotComponent,
    ConfirmationNumberComponent,
    ViewReservationsComponent,
    BlockTimeslotsComponent,
    AddTimeslotsComponent,
    ConfirmPaymentsComponent,
    BlockDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
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
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
