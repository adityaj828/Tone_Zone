import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  filter: String = 'Search by ';
  constructor() { }

  ngOnInit(): void {
  }

  Onfilterchange(filtername: any) {
    this.filter= 'Search by '+filtername;
}
}

