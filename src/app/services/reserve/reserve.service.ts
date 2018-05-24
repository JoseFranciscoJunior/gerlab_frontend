import { Reserve } from './../../model/reserve';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HELP_DESK_API } from '../helpdesk.api';

@Injectable()
export class ReserveService {
  
  constructor(private http: HttpClient) {}

  login(reserve: Reserve){
    return this.http.post(`${HELP_DESK_API}/api/auth`,reserve);
  }

  createOrUpdate(reserve: Reserve){
    if(reserve.id != null && reserve.id != ''){
      return this.http.put(`${HELP_DESK_API}/api/reserve`,reserve);
    } else {
      reserve.id = null;
      return this.http.post(`${HELP_DESK_API}/api/reserve`, reserve);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${HELP_DESK_API}/api/reserve/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/reserve/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${HELP_DESK_API}/api/reserve/${id}`);
  }
}
