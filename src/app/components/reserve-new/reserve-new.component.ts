import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { ReserveService } from './../../services/reserve/reserve.service';
import { SharedService } from './../../services/shared.service';
import { Reserve } from './../../model/reserve';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reserve-new',
  templateUrl: './reserve-new.component.html',
  styleUrls: ['./reserve-new.component.css']
})
export class ReserveNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  reserve = new Reserve('','',null);
  shared : SharedService;
  message : {};
  classCss : {};
  
  constructor(
    private reserveService: ReserveService,
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
    this.reserveService.findById(id).subscribe((responseApi:ResponseApi) => {
      this.reserve = responseApi.data;
      this.reserve.password = '';
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  register(){
    this.message = {};
    this.reserveService.createOrUpdate(this.reserve).subscribe((responseApi:ResponseApi) => {
        this.reserve = new Reserve('','',null);
        let reserveRet : Reserve = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registered ${reserveRet.email} successfully`
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