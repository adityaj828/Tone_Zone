import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceCenter } from 'src/app/model/service-center.model';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {
  addServiceForm: FormGroup;
  addServiceFormSubmitted: boolean;
  URL: string;
  constructor(private baseService: BaseService,
              private router: Router) {
    this.addServiceFormSubmitted = false;
    this.URL = 'service-centers/store'
  }

  ngOnInit() {
    this.addServiceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      describtion: new FormControl('', Validators.required)
    });
  }

  addService() {
    let serviceCenter = new ServiceCenter(this.email.value, this.name.value, this.describtion.value)
    this.addServiceFormSubmitted = true;
    if (this.addServiceForm.valid) {
      this.baseService.post(this.URL, serviceCenter)
        .subscribe(
          data => {
            if (data) {
              this.router.navigate(['/admin/services']);
            }
          },
          error => {
            console.error(error);
          }
        );
    }
  }

  get name() {
    return this.addServiceForm.get('name');
  }
  get email() {
    return this.addServiceForm.get('email');
  }
  get describtion() {
    return this.addServiceForm.get('describtion');
  }
}
