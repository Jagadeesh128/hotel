import {
  AfterContentInit,
  Component,
  ContentChild,
  Host,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers: [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  
  constructor() {}
  
  
  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = "Rick";
  }

  ngOnInit(): void {}
}
