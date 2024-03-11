import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent implements OnInit {
  successMessage: string = '';

  room: RoomList = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0,
  };

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {}

  AddRoom(roomsForm : NgForm) {
    this.roomsService
      .addRoom(this.room)
      .subscribe((data) => {this.successMessage = 'New Added Succesfully..';
      roomsForm.resetForm(
        {
          roomType: '',
          amenities: '',
          price: 0,
          photos: '',
          checkinTime: new Date(),
          checkoutTime: new Date(),
          rating: 0,
        }
      );});
  }
}
