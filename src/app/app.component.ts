import { AfterViewInit, Component, ElementRef,Inject,OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { HeaderComponent } from './header/header.component';
import { LoggerService } from './logger.service';
import{localStorageToken} from './localstorage.token';
import { InitService } from './init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hotel';

  role = '';

  @ViewChild('name', {static: true}) name!:ElementRef;

  constructor(private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: any,
    private initService: InitService
    ) {
      console.log(initService.config);
     }

  ngOnInit(): void {
    this.loggerService?.log('AppComponent.ngOninit()');
    // this.name.nativeElement.innerText = "Hilton Hotels";
    this.localStorage.setItem('name', 'Hilton Hotel');
  }

 



  // @ViewChild('user', {read: ViewContainerRef} ) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.noofRooms = 50;
  // }

}
