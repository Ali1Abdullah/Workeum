import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthGuardService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-panel',
  templateUrl: './member-panel.component.html',
  styleUrls: ['./member-panel.component.css']
})
export class MemberPanelComponent implements OnInit {
  showFiller = false;


  ngOnInit(): void {
    
  }
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  private _mobileQueryListener: () => void;

   
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ,private authGurdService: AuthGuardService,private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }



  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  //to scroll to top of pages when navigating between routes
  onActivate(event) {
    window.scroll(0,0);
  }

  onLogout(){
    this.authGurdService.setLoggedIn(false)
    localStorage.setItem("UserId",null)
    this.router.navigate([''])
  }

}

