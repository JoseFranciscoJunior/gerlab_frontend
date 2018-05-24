import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { LaboratoryService } from './../../services/laboratory/laboratory.service';
import { SharedService } from './../../services/shared.service';
import { Laboratory } from './../../model/laboratory';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-laboratory-new',
  templateUrl: './laboratory-new.component.html',
  styleUrls: ['./laboratory-new.component.css']
})
export class LaboratoryNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  laboratory = new Laboratory('','');
  shared : SharedService;
  message : {};
  classCss : {};
  
  constructor(
    private laboratoryService: LaboratoryService,
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
    this.laboratoryService.findById(id).subscribe((responseApi:ResponseApi) => {
      this.laboratory = responseApi.data;
      this.laboratory.password = '';
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  register(){
    this.message = {};
    this.laboratoryService.createOrUpdate(this.laboratory).subscribe((responseApi:ResponseApi) => {
        this.laboratory = new Laboratory(null,'');
        let laboratoryRet : Laboratory = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registered ${laboratoryRet.email} successfully`
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