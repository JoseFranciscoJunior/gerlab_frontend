import { Schedule } from './../../model/schedule';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HELP_DESK_API } from '../helpdesk.api';

@Injectable()
export class ScheduleService {
  
  constructor(private http: HttpClient) {}

  login(schedule: Schedule){
    return this.http.post(`${HELP_DESK_API}/api/auth`,schedule);
  }

  createOrUpdate(schedule: Schedule){
    if(schedule.id != null && schedule.id != ''){
      return this.http.put(`${HELP_DESK_API}/api/schedule`,schedule);
    } else {
      schedule.id = null;
      return this.http.post(`${HELP_DESK_API}/api/schedule`, schedule);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${HELP_DESK_API}/api/schedule/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/schedule/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${HELP_DESK_API}/api/schedule/${id}`);
  }
}
