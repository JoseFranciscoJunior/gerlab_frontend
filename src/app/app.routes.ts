import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/security/login/login.component";
import { HomeComponent } from './components/home/home.component';
import { ModuleWithProviders } from "@angular/core";
import { AuthGuard } from './components/security/auth.guard';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LaboratoryNewComponent } from './components/laboratory-new/laboratory-new.component';
import { LaboratoryListComponent } from './components/laboratory-list/laboratory-list.component';
import { ReserveNewComponent } from './components/reserve-new/reserve-new.component';
import { ReserveListComponent } from './components/reserve-list/reserve-list.component';
import { ScheduleNewComponent } from './components/schedule-new/schedule-new.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { TicketNewComponent } from './components/ticket-new/ticket-new.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { SummaryComponent } from './components/summary/summary.component';

export const ROUTES: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: '' , component:  HomeComponent, canActivate: [AuthGuard]},
  { path: 'user-new' , component: UserNewComponent, canActivate: [AuthGuard] },
  { path: 'user-new/:id' , component: UserNewComponent, canActivate: [AuthGuard] },
  { path: 'user-list' , component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'laboratory-new' , component: LaboratoryNewComponent, canActivate: [AuthGuard] },
  { path: 'laboratory-new/:id' , component: LaboratoryNewComponent, canActivate: [AuthGuard] },
  { path: 'laboratory-list' , component: LaboratoryListComponent, canActivate: [AuthGuard] },
  { path: 'reserve-new' , component: ReserveNewComponent, canActivate: [AuthGuard] },
  { path: 'reserve-new/:id' , component: ReserveNewComponent, canActivate: [AuthGuard] },
  { path: 'reserve-list' , component: ReserveListComponent, canActivate: [AuthGuard] },
  { path: 'schedule-new' , component: ScheduleNewComponent, canActivate: [AuthGuard] },
  { path: 'schedule-new/:id' , component: ScheduleNewComponent, canActivate: [AuthGuard] },
  { path: 'schedule-list' , component: ScheduleListComponent, canActivate: [AuthGuard] },
  { path: 'ticket-new' , component: TicketNewComponent, canActivate: [AuthGuard] },
  { path: 'ticket-new/:id' , component: TicketNewComponent, canActivate: [AuthGuard] },
  { path: 'ticket-list' , component: TicketListComponent, canActivate: [AuthGuard] },
  { path: 'ticket-detail/:id' , component: TicketDetailComponent, canActivate: [AuthGuard] },
  { path: 'summary' , component: SummaryComponent, canActivate: [AuthGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);

