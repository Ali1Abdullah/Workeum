import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { AppService } from 'src/app/services/app.service';
import { Message } from 'src/app/models/message.model';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[]=[];
  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getDataFromApi('','api/messages', Message).subscribe((messages)=>{
      AppService.appLog(['messages',messages]);
      this.messages = messages
    });
  }

}
