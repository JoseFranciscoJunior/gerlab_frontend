import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from './../../services/schedule/schedule.service';
import { SharedService } from './../../services/shared.service';
import { Schedule } from './../../model/schedule';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-schedule-new',
  templateUrl: './schedule-new.component.html',
  styleUrls: ['./schedule-new.component.css']
})
export class ScheduleNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  schedule = new Schedule('','','');
  shared : SharedService;
  message : {};
  classCss : {};
  
  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id:string){
    this.scheduleService.findById(id).subscribe((responseApi:ResponseApi) => {
      this.schedule = responseApi.data;
      this.schedule.password = '';
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  register(){
    this.message = {};
    this.scheduleService.createOrUpdate(this.schedule).subscribe((responseApi:ResponseApi) => {
        this.schedule = new Schedule(null,'','');
        let scheduleRet : Schedule = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registered ${scheduleRet.email} successfully`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);
      setTimeout(() => {
        this.message = undefined;
      }, 3000);
  }

  private buildClasses(type: string): void {
     this.classCss = {
       'alert': true
     }
     this.classCss['alert-'+type] =  true;
  }

}