import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { AdminPageComponent } from "./pages/admin-page/admin-page.component";
import { CancelPageComponent } from "./pages/cancel-page/cancel-page.component";
import { PaymentPageComponent } from "./pages/payment-page/payment-page.component";
import { ReservationPageComponent } from "./pages/reservation-page/reservation-page.component";
import { TimeslotComponent } from "./components/timeslot/timeslot.component";
import { AuthGuard } from "./guards/authGuard/auth.guard";

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'reservation/:fieldId', component: ReservationPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'payment', component: PaymentPageComponent },
  { path: 'cancel', component: CancelPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
  { path: 'timeslot', component: TimeslotComponent},
];