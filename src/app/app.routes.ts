import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((page) => page.HomePage) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then((page) => page.AboutPage) },
  { path: 'services', loadComponent: () => import('./pages/services/services').then((page) => page.ServicesPage) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((page) => page.ContactPage) },
  { path: 'product/:id', loadComponent: () => import('./pages/product/product').then((page) => page.ProductPage) },
  { path: 'products', loadComponent: () => import('./pages/products/products').then((page) => page.ProductsPage) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart').then((page) => page.CartPage) },
  { path: '**', redirectTo: '' },
];
