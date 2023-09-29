import { Injectable } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  showNav = true;
  constructor(private router: Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        if(currentRoute==='/userLogin' || currentRoute==='/userRegister' || currentRoute === '/') {
          this.showNav = false;
        }else{
          this.showNav = true;
        }
        // this.showNav = !(currentRoute.includes('userLogin') || currentRoute.includes('userRegister') || currentRoute === '');
        console.log(this.showNav)
        console.log(currentRoute);
        
      }
    });
  }
}
