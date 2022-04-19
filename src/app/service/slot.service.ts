import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slot } from '../user/single-service/single-service.component';

@Injectable({
  providedIn: 'root'
})
export class SlotService {



  constructor(private httpClient: HttpClient) { }

  //need to pass serviceCenterID & Booking Date values to the API call
  getSlots(serviceCenterId, bookingDate) {
    return this.httpClient.get<Slot[]>(
      'http://localhost:8081/store',
    );
  }


  bookSlot(slotData: any) {
    return this.httpClient.post<Slot>(
      'http://localhost:8081/store',
      slotData
    );
  }


}
