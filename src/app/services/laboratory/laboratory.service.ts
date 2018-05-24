import { Laboratory } from './../../model/laboratory';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HELP_DESK_API } from '../helpdesk.api';

@Injectable()
export class LaboratoryService {
  
  constructor(private http: HttpClient) {}

  login(laboratory: Laboratory){
    return this.http.post(`${HELP_DESK_API}/api/auth`,laboratory);
  }

  createOrUpdate(laboratory: Laboratory){
    if(laboratory.id != null && laboratory.id != ''){
      return this.http.put(`${HELP_DESK_API}/api/laboratory`,laboratory);
    } else {
      laboratory.id = null;
      return this.http.post(`${HELP_DESK_API}/api/laboratory`, laboratory);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${HELP_DESK_API}/api/laboratory/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/laboratory/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${HELP_DESK_API}/api/laboratory/${id}`);
  }
}
