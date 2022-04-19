import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SlotService } from 'src/app/service/slot.service';

@Component({
  selector: 'app-single-service',
  templateUrl: './single-service.component.html',
  styleUrls: ['./single-service.component.scss']
})
export class SingleServiceComponent implements OnInit {
  slotList: Slot[] = [];
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  morningSlots = ['9:00 AM', '10:00 AM', '11:00 AM'];
  afternoonSlots = ['1:00 PM', '2:00 PM', '3:00 PM'];
  slotDates = [];

  bookingDate;
  serviceCenterId: number;


  constructor(private slotService: SlotService,) { }
  ngOnInit(): void {
    this.serviceCenterId = 1;

    this.populateDates();
    this.getSlotData();

    this.bookingDate = this.slotDates[0].value;

  }

  populateDates() {
    let today = new Date();
    this.slotDates.push({ "text": "Today", "value": new DatePipe('en-US').transform(today, 'dd-MM-yyyy') });
    today.setDate(today.getDate() + 1);
    this.slotDates.push({ "text": "Tomorrow", "value": new DatePipe('en-US').transform(today, 'dd-MM-yyyy') });
    today.setDate(today.getDate() + 1);
    this.slotDates.push({ "text": this.days[today.getDay()], "value": new DatePipe('en-US').transform(today, 'dd-MM-yyyy') });
  }


  getSlotData() {
     this.slotService.getSlots(this.serviceCenterId, this.bookingDate).subscribe(
       resData => {
         this.slotList = resData;
       }, error => {
         console.log(error);
      }
    );
  }

  setSlotBookingDate(dateObj: any) {
    this.bookingDate = dateObj.value;
    this.getSlotData();
  }


  checkSlotBooked(sTime: string): boolean {
    let rtVal: boolean = false;
    this.slotList.forEach(element => {
      if (element.slotTime === sTime && element.slotDate === this.bookingDate) {
        rtVal = true;
      }
    });
    return rtVal;
  }


  bookSlot(sTime: string) {
    let data: any = {
      slotDate: this.bookingDate,
      slotTime: sTime,
      status: '1',
      serviceCenterId: this.serviceCenterId
    };

    this.slotService.bookSlot(data).subscribe(
      resData => {
        console.log(resData);
        this.getSlotData();
      }
    );
  }
}


export class Slot {
  slotId: number;
  slotDate: string;
  slotTime: string;
  status: string;
  customerId: number;
  serviceCenterId: number;
}