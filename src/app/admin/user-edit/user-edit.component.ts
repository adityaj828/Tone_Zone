import { stripSummaryForJitNameSuffix } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
//import * as internal from 'stream';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  name : String;
  email : String;
  address : String;
  phoneNumber : number;
  gender : String;
  password : String ;
  confirmPassword : String;
  result:String

  user={'fname' : 'Srijani Das' , 'email':'srijaniasansol@gmail.com', 'address':'Ismile R K ROY ROAD 713301', 'phone':'8001776475'};

  reactiveForm: FormGroup;
  constructor(private _fb: FormBuilder,private router:Router,private http:HttpClient, private modalService : NgbModal )
  {

  }
  ngOnInit() {
      this.reactiveForm=this._fb.group({
        name : [],
        email :[],
        address : [],
        phone : [],
        grnder : [],
        password : [],
        confirmPassword :[]
      });
  }

    //log(x) {  console.log(x); }

    /*submitHandler()
    {
      this.router.navigate[("../dashboard")];
      //console.log(myForm);
      //console.log('Model value', this.user);
      //console.log('Form value is', myForm.value);
    }*/
   // onSubmit(myForm : NgForm)
   updateUser()
    {
      console.log("you successfully edit your form");
      //http://httpbin.org/post
      const url = 'http://localhost:8080/admin/user/update';
      this.http.post(url,{
        name:this.name,
        email : this.email,
        address : this.address,
        phoneNumber :  this.phoneNumber,
        gender:this.gender,
        password:this.password,
        confirmPassword:this.confirmPassword
      }).toPromise().then((data: any)=> {
        console.log(data);
        this.result=JSON.stringify(data.json.name);
      }).catch(err =>{
        console.error(err);
      })

      
  }
}
