import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer';
import { CartService } from './services/cart.service';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CartDrawerComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App { readonly cart = inject(CartService); }
