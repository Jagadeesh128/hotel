import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, observable, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotelName = 'Hilton Hotel';
  noofRooms = 10;
  totalBytes = 0;
  hideRooms = true;
  title = 'Room List';

  selectedRoom!: RoomList;

  roomList: RoomList[] = [];

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerchildrenComponent!: QueryList<HeaderComponent>;

  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms)=> rooms.length)
  );

  constructor(@SkipSelf() private roomsService: RoomsService, private configService: ConfigService) {}

  ngAfterViewChecked(): void {}

  ngAfterViewInit(): void {
    this.headerComponent.title = ' Rooms View';
    this.headerchildrenComponent.last.title = 'Last Title';
  }

  ngDoCheck(): void {
    console.log('on changes is called');
  }

  subscription!: Subscription;

  ngOnInit(): void {
    // console.log(this.headerComponent);
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });
    this.stream.subscribe((data) => console.log(data));
    // this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Suit',
      amenities: 'Ac, free wi-fi, tv, bathroom, kitchen',
      price: 700,
      photos:
        'https://www.lemontreehotels.com/images/propertygallery/28_Jun_2023_04_36_21Lobby.jpg',
      checkinTime: new Date('21-feb-2024'),
      checkoutTime: new Date('24-feb-2024'),
      rating: 4.3,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Suit',
      amenities: 'Ac, free wi-fi, tv, bathroom, kitchen',
      price: 700,
      photos:
        'https://www.lemontreehotels.com/images/propertygallery/28_Jun_2023_04_36_21Lobby.jpg',
      checkinTime: new Date('21-feb-2024'),
      checkoutTime: new Date('24-feb-2024'),
      rating: 4.3,
    };
    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
