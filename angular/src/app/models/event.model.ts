import { Main } from './main.model';


export interface EventType {
   EventId: number;
   EventTitle: string;
   EventDescription: string;
   EventDate: string;
   EventStart: string;
   EventEnd:string;
   EventImage: string;
}

export class Event extends Main implements EventType {
   public EventId: number;
   public EventTitle: string;
   public EventDescription: string;
   public EventDate: string;
   public EventStart: string;
   public EventEnd: string;
   public EventImage: string;

   constructor(event: EventType) {
      super(event);
      this.EventTitle = event.EventTitle;
      this.EventDescription = event.EventDescription;
      this.EventDate = event.EventDate;
      this.EventStart= event.EventStart;
      this.EventEnd = event.EventEnd;
      this.EventImage = event.EventImage;

   }
}