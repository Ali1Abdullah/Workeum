import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MainService } from 'src/app/services/main.service';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/models/compnay.model';
import { EditCompanyPopupComponent } from './edit-company-popup/edit-company-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class CompanyManagementComponent implements OnInit {

  constructor(public mainService: MainService, public dialog: MatDialog){}
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('MatPaginator', { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['Image', 'CompanyName', 'FounderName', 'BussinessType','Email', 'Phone','Actions'];
  public dataSource;

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(){
    this.mainService.getDataFromApi('','api/companies',Company).subscribe(data=>{
      data.forEach(company => {
        company.Image ='../../../assets/companys/'+ company.Image
      });
      this.dataSource = new MatTableDataSource(data)
      
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })

  }
  getRecord(row){

  }

  delete(id){
      this.mainService.deleteItemInApi('' ,'api/companies/delete/'+id).subscribe()
      location.reload()
  }

  edit(id){
    this.dialog.open(EditCompanyPopupComponent,{
     height: "85%",
     width: "70%",
      data:{
        id:id
      }
    })
   }


}