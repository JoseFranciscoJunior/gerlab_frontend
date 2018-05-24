import { ResponseApi } from './../../model/response-api';
import { Reserve } from './../../model/reserve';
import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { ReserveService } from './../../services/reserve/reserve.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css']
})
export class ReserveListComponent implements OnInit {

  page:number=0;
  count:number=5;
  pages:Array<number>;
  shared : SharedService;
  message : {};
  classCss : {};
  listReserve=[];

  constructor(
    private dialogService: DialogService,
    private reserveService: ReserveService,
    private router: Router) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page:number,count:number){
    this.reserveService.findAll(page,count).subscribe((responseApi:ResponseApi) => {
        this.listReserve = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });

  }

  edit(id:string){
    this.router.navigate(['/reserve-new',id]);
  }

  delete(id:string){
    this.dialogService.confirm('Do you want to delete the email ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.reserveService.delete(id).subscribe((responseApi:ResponseApi) => {
                this.showMessage({
                  type: 'success',
                  text: `Record deleted`
                });
                this.findAll(this.page,this.count);
            } , err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
            });
          }
      });
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page =  this.page +1;
      this.findAll(this.page,this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page =  this.page - 1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
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