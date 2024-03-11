import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rooms: RoomList[] | null =[];
  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    console.log('on Destory is called');
  }
  

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

}
