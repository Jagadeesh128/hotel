import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  // providers: [RoomsService]
})
export class EmployeeComponent implements OnInit {

  empName: string = 'Jagadeesh';
  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
  }

}
