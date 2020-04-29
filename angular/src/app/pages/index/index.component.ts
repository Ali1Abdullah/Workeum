import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Post } from 'src/app/models/post.model';
import { MainService } from 'src/app/services/main.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  
})
export class IndexComponent implements OnInit {

  constructor(private mainService: MainService) { }

  slides = [
    {img: "../../../assets/images/slider1.png"},
    {img: "../../../assets/images/2.jpg"},
    {img: "../../../assets/images/3.jpg"},
  ];

   slideConfig = { 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    easing: 'ease',
    speed:1000,
 
  };

  
  ngOnInit() {
    this.mainService.getDataFromApi('','posts', Post).subscribe((posts)=>{
      AppService.appLog(['posts',posts]);
    });
  }

}
