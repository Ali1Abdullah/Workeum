import { Main } from './main.model';


export interface CompanyType {
   CompanyId: number;
   FounderName: string;
   CompanyName: string;
   Email: string;
   PhoneNumber: string;
   BusinessType:string;
   Others: string;
   Password:string;
   Image:string;
}



export class Company extends Main implements CompanyType {
   public CompanyId: number;
   public FounderName: string;
   public CompanyName: string;
   public Email: string;
   public PhoneNumber: string;
   public BusinessType: string;
   public Others: string;
   public Password: string;
   public Image: string

   constructor(company: CompanyType) {
      super(company);
      this.CompanyId = company.CompanyId
      this.FounderName = company.FounderName;
      this.CompanyName = company.CompanyName;
      this.Email = company.Email;
      this.PhoneNumber= company.PhoneNumber;
      this.BusinessType = company.BusinessType;
      this.Others = company.Others;
      this.Password = company.Password;
      this.Image = company.Image

   }
}