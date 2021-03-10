import { Component, NgModule, OnInit } from '@angular/core';
import { SocketIOService } from '../socket-io.service';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

   // tslint:disable-next-line:no-shadowed-variable
  constructor(private SocketIOService: SocketIOService) {}
  // username: string;
   // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    // this.openDialog();
    this.SocketIOService.emit('user-connect', 'USERNAME');

    this.SocketIOService.listen('new-user').subscribe((data: any) => {
      console.log(data);
    });

    this.SocketIOService.listen('new-message').subscribe((data: any) => {
      console.log(data);
    });
  }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(LoginDialogComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  // });

  // sendMessageToServer(): void {
  //   this.SocketIOService.emit('message', );
  // }
}
