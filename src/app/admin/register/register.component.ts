import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  name : string;
  email : string;
  address : string;
  phoneNumber : number;
  gender :string;
  password : string ;
  confirmPassword : string;
  result:string

  user={'name' : 'Srijani Das' , 'email':'srijaniasansol@gmail.com', 'address':'Ismile R K ROY ROAD 713301', 'phone':'8001776475'};

  reactiveForm: FormGroup;
  constructor(private _fb: FormBuilder,private router:Router, private http:HttpClient, private modalService : NgbModal )
  {

  }

  ngOnInit() {
    this.reactiveForm=this._fb.group({
      name : [],
      email :[],
      address : [],
      phone : [],
      gender : [],
      password : [],
      confirmPassword :[]
    });
  }
  // updateUser()
  //   {
  //     console.log("you successfully edit your form");
  //     //http://httpbin.org/post
  //     const url = 'http://localhost:8080/admin/register';
  //     this.http.post(url,{
  //       name:this.name,
  //       email : this.email,
  //       address : this.address,
  //       phoneNumber :  this.phoneNumber,
  //       gender:this.gender,
  //       password:this.password,
  //       confirmPassword:this.confirmPassword
  //     }).toPromise().then((data: any)=> {
  //       console.log(data);
  //     }) 
  //   }
}
