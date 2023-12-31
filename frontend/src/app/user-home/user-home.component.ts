// import { ActivatedRoute } from '@angular/router';
// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-user-home',
//   templateUrl: './user-home.component.html',
//   styleUrls: ['./user-home.component.css']
// })
// export class UserHomeComponent implements OnInit {
//   userId!: string | null;

//   constructor(private route: ActivatedRoute, private userService: UserService) { }

//   ngOnInit(): void {
//     // Set the userId in the UserService (if not already set)
//     if (!this.userService.getUserId()) {
//       this.route.paramMap.subscribe(params => {
//         const userId = params.get('userId');
//         this.userService.setUserId(userId!);
//       });
//     }

//     // Get the userId from the UserService
//     this.userId = this.userService.getUserId();

//     // Now you can use this.userId as needed within your component
//     console.log(this.userId);
//   }
// }

import { Component,OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CartService } from '../cart-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  allproducts:any[]=[]
  totalProducts:number =20
  pageSize =5;
  currentPage:number =1
  userId!: string|null;



  constructor(private produServ:ProductService, private userService: UserService, private router: Router, 
    private cartService: CartService, private snackBar: MatSnackBar ){}

  ngOnInit(){
    this.userService.userId$.subscribe(userId => {
      this.userId = userId;
    });

    this.produServ.getAllProduct().subscribe({next:(data)=>{
      console.log(data);
      this.allproducts = data.slice(0,5)
      console.log(this.allproducts)
      this.totalProducts=data.totalProducts
    }})
  }

  changePage(pageData:PageEvent){
    this.currentPage = pageData.pageIndex+1
    this.produServ.getAllProduct().subscribe({next:(data)=>{
      console.log(data);
      this.allproducts = data.products
      this.totalProducts=data.totalProducts
    }})
  }

  navigateToProductDetails(productId: string): void {
    this.router.navigate(['/productDetails', productId , this.userId]);
  }

  navigateToCart(productId: string): void {

    this.cartService.addToCart(this.userId!, productId!, 1).subscribe(
      (response)=>{
        if(response){
          this.snackBar.open('Item Added To Cart', 'Close', {
            duration: 3000, // The message will be shown for 3 seconds
          });
          console.log(response);
        }
      },(error) => {
        console.error('Error adding to cart:', error);
        this.snackBar.open('Failed added to cart', 'Close', {
          duration: 3000, // The message will be shown for 3 seconds
          panelClass: ['error-snackbar'], // Optional CSS class for styling
        });
      });
  }
}

