import { Main } from './main.model';


export interface MemberType {
   MemberId: number;
   MemberName: string;
   CompanyName: string;
   Email: string;
   PhoneNumber: string;
   BOD:string;
   Position: string;
   Password:string;
   Image:string;
}

export class Member extends Main implements MemberType {
   public MemberId: number;
   public MemberName: string;
   public CompanyName: string;
   public Email: string;
   public PhoneNumber: string;
   public BOD: string;
   public Position: string;
   public Password: string;
   public Image: string

   constructor(member: MemberType) {
      super(member);
      this.MemberId = member.MemberId
      this.MemberName = member.MemberName;
      this.CompanyName = member.CompanyName;
      this.Email = member.Email;
      this.PhoneNumber= member.PhoneNumber;
      this.BOD = member.BOD;
      this.Position = member.Position;
      this.Password = member.Password;
      this.Image = member.Image

   }
}