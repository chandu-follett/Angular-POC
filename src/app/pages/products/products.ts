import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `<section class="listing-page"><div class="listing-intro"><p class="eyebrow">Northstar objects / Collection 01</p><h1>Things worth<br><em>keeping.</em></h1><p>Useful, tactile objects made for the rituals that make up a good day.</p></div><div class="listing-toolbar"><span>{{products.length}} products</span><a routerLink="/cart">View cart ↗</a></div><div class="product-grid">@for (product of products; track product.id) {<article class="product-card"><a [routerLink]="['/product', product.id]"><img [src]="product.images[0]" [alt]="product.title"><h2>{{product.title}}</h2></a><p class="product-price">&#36;{{product.price.toFixed(2)}}</p><div class="product-actions"><button class="add-small" type="button" (click)="addProduct(product)">Add to cart</button><a [routerLink]="['/product', product.id]">View details ↗</a></div></article>}</div></section>`,
  styles: [`.listing-page{max-width:var(--max);margin:auto;padding:100px 5vw 130px}.listing-intro{display:grid;grid-template-columns:1fr 1.5fr 1fr;gap:40px;align-items:end}.listing-intro h1{font:500 82px/.95 'Space Grotesk',sans-serif;letter-spacing:-.07em;margin:0}.listing-intro h1 em{color:#db633e;font-style:normal}.listing-intro>p:last-child{color:var(--muted);font-size:14px;line-height:1.7;margin:0}.listing-toolbar{display:flex;justify-content:space-between;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:80px;padding:16px 0;font:10px 'DM Mono',monospace;text-transform:uppercase;color:var(--muted)}.listing-toolbar a{color:var(--ink)}.listing-page .product-grid{margin-top:35px}.listing-page .product-card h2{font:500 19px 'Space Grotesk',sans-serif;margin:18px 0 5px}@media(max-width:700px){.listing-page{padding:65px 7vw 90px}.listing-intro{display:block}.listing-intro h1{font-size:60px;margin:25px 0}.listing-intro>p:last-child{max-width:300px}.listing-toolbar{margin-top:55px}}`],
})
export class ProductsPage {
  private readonly catalog = inject(ProductCatalogService);
  readonly products = this.catalog.products;
  readonly cart = inject(CartService);
  addProduct(product: Product) { this.cart.add(product, 1, 'product_listing_page'); }
  @HostListener('click', ['$event'])
  trackProductLink(event: MouseEvent) {
    const href = (event.target as HTMLElement).closest('a')?.getAttribute('href');
    const productId = Number(href?.match(/^\/product\/(\d+)$/)?.[1]);
    const product = this.catalog.getById(productId);
    if (product) this.analytics.track('product_details_clicked', 'product_listing_page', { id: product.id, title: product.title, sku: product.sku });
  }
  private readonly analytics = inject(AnalyticsService);
}
