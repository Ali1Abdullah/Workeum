import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MainService } from 'src/app/services/main.service';
import { Member } from 'src/app/models/member.model';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeePopupComponent } from './edit-employee-popup/edit-employee-popup.component';


@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  constructor(public mainService: MainService, public dialog: MatDialog ){}
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('MatPaginator', { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['Image', 'Name', 'CompanyName', 'Position','Email', 'Phone','Actions'];
  public dataSource;

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(){
    this.mainService.getDataFromApi('','api/members',Member).subscribe(data=>{
      data.forEach(member => {
        member.Image ='../../../assets/members/'+ member.Image
      });
      this.dataSource = new MatTableDataSource(data)
      
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })

  }
  getRecord(row){

  }

  delete(id){
      this.mainService.deleteItemInApi('' ,'api/members/delete/'+id).subscribe()
      location.reload()
  }

  edit(id){
   this.dialog.open(EditEmployeePopupComponent,{
    height: "85%",
    width: "70%",
     data:{
       id:id
     }
 
   })

  }

}
