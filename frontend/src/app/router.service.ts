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
        this.showNav = !currentRoute.includes('userLogin') && !currentRoute.includes('userRegister') && !currentRoute.includes('');
      }
    });
  }
}
