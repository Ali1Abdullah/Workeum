import { Main } from './main.model';


export interface MessageType {
   id: number;
   FirstName: string;
   LastName:string;
   PhoneNumber: number;
   Email: string;
   Content:string;
}



export class Message extends Main implements MessageType {
   public id: number;
   public FirstName: string;
   public LastName: string;
   public PhoneNumber: number;
   public Email: string;
   public Content: string;


   constructor(message: MessageType) {
      super(message);

      this.FirstName= message.FirstName ;
      this.LastName= message.LastName;
      this.PhoneNumber= message.PhoneNumber ;
      this.Email= message.Email ;
      this.Content= message.Content;


   }
}