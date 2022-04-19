
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ServiceCardComponent} from './user/service-card/service-card.component';
import { CardServiceService } from './card-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'demo1';

  serviceCenterDetails=null;
  serviceCenterToUpdate=
  {
     id:"",
	name:"",
	email:"",
	 img_url:"",
 describtion:"",
 raiting:"" 
  }

  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  isLoading: boolean;

  constructor(private router: Router,private ServiceCenter: CardServiceService) {
    this.getServiceCenter();

    /*getServiceCenter()
    {
      this.ServiceCenter.getServiceCenter().subscribe(
        (resp)=>{
          console.log(resp);
          this.ServiceCenter=resp;
        },
        (err)=>
        {
          console.log(err);
        }
      );
    }*/
    
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => { 
      if(event instanceof NavigationStart) {
        if((event['url'] == '/user-pages/login') || (event['url'] == '/user-pages/register') || (event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500') ) {
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          document.querySelector('.main-panel').classList.add('w-100');
          document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg', );
          document.querySelector('.content-wrapper').classList.remove('auth', 'lock-full-bg');
          if((event['url'] == '/error-pages/404') || (event['url'] == '/error-pages/500')) {
            document.querySelector('.content-wrapper').classList.add('p-0');
          }
        } else {
          this.showSidebar = true;
          this.showNavbar = true;
          this.showFooter = true;
          document.querySelector('.main-panel').classList.remove('w-100');
          document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
          document.querySelector('.content-wrapper').classList.remove('p-0');
        }
      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => { 
      if (event instanceof RouteConfigLoadStart) {
          this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
          this.isLoading = false;
      }
    });
  }
  /*getServiceCenter() {
    throw new Error('Method not implemented.');
  }*/

  getServiceCenter()
    {
      this.ServiceCenter.getServiceCenter().subscribe(
        (resp)=>{
          console.log(resp);
          this.serviceCenterDetails=resp;
        },
        (err)=>
        {
          console.log(err);
        }
      );
    }


  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }
}

