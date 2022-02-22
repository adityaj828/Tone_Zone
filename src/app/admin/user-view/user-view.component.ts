import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {
  users: [];
  getUsersURL = 'users/all';
  dtOptions: DataTables.Settings = {};

  constructor(private baseService: BaseService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        const params = this.objectToHttpParams(dataTablesParameters);
        console.log('params', params);

        this.baseService.get(this.getUsersURL)
          .subscribe(resp => {

            this.users = resp;

            callback({
              recordsTotal: resp.length,
              recordsFiltered: resp.length,
              data: []
            });
          });
      }
    };
  }

  objectToHttpParams(obj: any) {
    return Object.entries(obj || {}).reduce((params, [key, value]) => {
      return params.set(
        key,
        JSON.stringify(value)
      );
    }, new HttpParams());
  }

}
