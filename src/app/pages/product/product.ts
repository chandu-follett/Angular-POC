import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `@if (product) {<section class="product-page"><a class="back" routerLink="/">← Back to shop</a><div class="product-top"><div class="gallery"><img [src]="product.images[activeImage]" [alt]="product.title"><div class="thumbs">@for (image of product.images; track image; let index = $index) {<button [class.active]="index === activeImage" (click)="activeImage = index"><img [src]="image" [alt]="product.title + ' view ' + (index + 1)"></button>}</div></div><div class="product-info"><p class="eyebrow">Northstar object / 0{{product.id}}</p><h1>{{product.title}}</h1><p class="price">&#36;{{product.price.toFixed(2)}}</p><p class="description">{{product.description}}</p><div class="buy-row"><div class="quantity"><button (click)="decreaseQuantity()">−</button><span>{{quantity}}</span><button (click)="increaseQuantity()">+</button></div><button class="button" (click)="addToCart()">Add to cart <b>↗</b></button></div></div></div><div class="product-description"><p class="eyebrow">Details</p><p>Made with honest materials and a focus on lasting utility. Each piece is packed by hand in our studio and sent with care. Designed to become part of your everyday, not compete with it.</p></div></section>} @else {<section class="missing"><h1>Product not found</h1><a class="text-link" routerLink="/">Return to shop ↗</a></section>}`,
  styles: [`.product-page{max-width:var(--max);margin:auto;padding:55px 5vw 120px}.back{font-size:12px;color:var(--muted)}.product-top{display:grid;grid-template-columns:1.15fr 1fr;gap:8%;margin-top:45px}.gallery>img{width:100%;height:610px;object-fit:cover}.thumbs{display:flex;gap:10px;margin-top:12px}.thumbs button{padding:0;border:2px solid transparent;background:transparent;cursor:pointer}.thumbs button.active{border-color:var(--ink)}.thumbs img{display:block;width:64px;height:72px;object-fit:cover}.product-info{padding-top:45px}.product-info h1{font:500 67px/.96 'Space Grotesk';letter-spacing:-.07em;margin:22px 0}.price{font:500 22px 'Space Grotesk'}.description{color:var(--muted);font-size:14px;line-height:1.8;max-width:390px;margin:35px 0 55px}.buy-row{display:flex;gap:12px}.quantity{display:flex;align-items:center;border:1px solid var(--line)}.quantity button{width:38px;height:44px;border:0;background:transparent;font-size:20px;cursor:pointer}.quantity span{width:28px;text-align:center;font-size:13px}.product-description{border-top:1px solid var(--line);margin-top:110px;padding-top:28px;display:grid;grid-template-columns:1fr 2fr}.product-description>p:last-child{max-width:580px;color:var(--muted);line-height:1.8;font-size:14px;margin:0}.missing{padding:120px 7vw}.missing h1{font:500 60px 'Space Grotesk'}@media(max-width:700px){.product-page{padding:40px 7vw 80px}.product-top{display:block}.gallery>img{height:410px}.product-info{padding-top:50px}.product-info h1{font-size:52px}.product-description{display:block;margin-top:75px}.product-description>p:last-child{margin-top:25px}.buy-row{flex-wrap:wrap}}`],
})
export class ProductPage {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(ProductCatalogService);
  readonly cart = inject(CartService);
  private readonly analytics = inject(AnalyticsService);
  product = this.catalog.getById(Number(this.route.snapshot.paramMap.get('id')));
  activeImage = 0;
  quantity = 1;
  constructor() {
    if (this.product) this.analytics.track('product_viewed', 'product_detail_page', { id: this.product.id, title: this.product.title, sku: this.product.sku, product_quantity: 1 });
  }
  decreaseQuantity() { this.quantity = Math.max(1, this.quantity - 1); this.trackQuantityChange(); }
  increaseQuantity() { this.quantity += 1; this.trackQuantityChange(); }
  addToCart() { if (this.product) this.cart.add(this.product, this.quantity, 'product_detail_page'); }
  private trackQuantityChange() { if (this.product) this.analytics.track('product_quantity_updated', 'product_detail_page', { id: this.product.id, title: this.product.title, sku: this.product.sku, product_quantity: this.quantity }); }
}

