import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { CartService } from '../../services/cart.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-home',
  template: `
    <section class="home-hero"><a class="hero-image" routerLink="/contact"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85" alt="Sunlit modern studio interior"><span>Talk to us ↗</span></a><div class="hero-copy"><p class="eyebrow">Independent creative studio / 2024</p><h1>Ideas with room<br>to <em>grow.</em></h1><p>Northstar is a strategy and design studio helping ambitious teams make their next move with clarity.</p><button id="bring-us-a-brief" class="button" type="button" (click)="openBriefForm()">Bring us a brief <b>↗</b></button></div></section>
    <section class="section-grid"><div class="section-label">01 / About Northstar</div><div><h2>Good work starts with paying attention.</h2><p>We believe the best outcomes come from looking closer: at the people, the problem, and the possibilities hiding in plain sight.</p><a class="text-link" routerLink="/about">More about us ↗</a></div><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85" alt="Creative team working at a table"></section>
    <section class="services-preview"><div class="section-heading"><div><p class="eyebrow">02 / What we do</p><h2>Useful by design.</h2></div><a class="text-link" routerLink="/services">View all services ↗</a></div><div class="service-grid"><article><b>01</b><h3>Brand strategy</h3><p>Find your sharpest point of view and turn it into direction.</p></article><article><b>02</b><h3>Visual identity</h3><p>Flexible systems that make your brand recognizable.</p></article><article><b>03</b><h3>Digital experiences</h3><p>Websites that balance a clear story with human rhythm.</p></article><article><b>04</b><h3>Campaigns</h3><p>Focused creative that keeps the conversation moving.</p></article></div></section>
    <section class="products-section"><div class="section-heading"><div><p class="eyebrow">04 / Northstar objects</p><h2>Things worth<br><em>keeping.</em></h2></div><a class="text-link" routerLink="/cart">View cart ?</a></div><div class="product-grid">@for (product of products; track product.id) {<article class="product-card"><a [routerLink]="['/product', product.id]"><img [src]="product.images[0]" [alt]="product.title"><h3>{{product.title}}</h3></a><p class="product-price">&#36;{{product.price.toFixed(2)}}</p><div class="product-actions"><button class="add-small" (click)="addProduct(product)">Add to cart</button><a [routerLink]="['/product', product.id]">View details ?</a></div></article>}</div></section><section class="home-contact"><div><p class="eyebrow">03 / Say hello</p><h2>Have a good question?<br><em>Let's talk.</em></h2></div><div><p>New York · London · Melbourne<br>Working globally, by appointment.</p><a class="button light" routerLink="/contact">Contact Northstar ↗</a></div></section>
    @if (isBriefFormOpen) {
      <div class="modal-backdrop" (click)="closeBriefForm()"><section class="brief-modal" role="dialog" aria-modal="true" aria-labelledby="brief-title" (click)="$event.stopPropagation()"><button class="modal-close" type="button" aria-label="Close form" (click)="closeBriefForm()">×</button><p class="eyebrow">Start a conversation</p><h2 id="brief-title">Tell us about<br><em>your brief.</em></h2><form (ngSubmit)="submitBrief()" #briefForm="ngForm"><label>Name<input name="name" required [(ngModel)]="brief.name" placeholder="Your name"></label><label>Email<input name="email" type="email" required [(ngModel)]="brief.email" placeholder="you@company.com"></label><label>Phone<input name="phone" required [(ngModel)]="brief.phone" placeholder="+1 212 555 0100"></label><label>Address<input name="address" required [(ngModel)]="brief.address" placeholder="City, country"></label><button class="button" type="submit" [disabled]="briefForm.invalid">Send brief <b>↗</b></button></form></section></div>
    }
    @if (isSubmitted) { <div class="toast" role="status">Thanks, we will be in touch shortly.</div> }
  `,
  styles: [
    `.home-hero{position:relative;max-width:var(--max);margin:35px auto 0;min-height:610px;padding:0 5vw;display:flex;align-items:flex-end}.hero-image{position:absolute;inset:0 5vw 0 auto;width:65%;overflow:hidden}.hero-image img{width:100%;height:100%;object-fit:cover}.hero-image:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(23,33,31,.5),transparent 60%)}.hero-image span{position:absolute;right:22px;bottom:22px;z-index:1;background:var(--lime);padding:12px;font-size:11px}.hero-copy{position:relative;z-index:1;width:52%;padding-bottom:58px}.hero-copy h1{font:600 clamp(55px,7vw,100px)/.94 'Space Grotesk',sans-serif;letter-spacing:-.07em;margin:25px 0}.hero-copy h1 em,h2 em{color:#db633e;font-style:normal}.hero-copy>p:not(.eyebrow){max-width:350px;line-height:1.6;color:var(--muted);font-size:14px;margin-bottom:27px}.button{border:0;cursor:pointer}.button b{color:var(--lime)}.section-grid{max-width:var(--max);margin:auto;display:grid;grid-template-columns:1fr 1.5fr 1.5fr;gap:40px;padding:135px 5vw}.section-grid h2,.section-heading h2{font:500 53px/.98 'Space Grotesk',sans-serif;letter-spacing:-.06em;margin:0 0 25px}.section-grid p{max-width:390px;color:var(--muted);line-height:1.7}.section-grid img{width:100%;height:280px;object-fit:cover;margin-top:70px}.text-link{display:inline-block;margin-top:24px;border-bottom:1px solid var(--ink);padding-bottom:5px;font-size:12px;font-weight:700}.services-preview{background:#e0e1d7;padding:105px 5vw}.section-heading{max-width:var(--max);margin:auto;display:flex;justify-content:space-between;align-items:end}.service-grid{max-width:var(--max);margin:65px auto 0;display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line)}.service-grid article{background:#e0e1d7;padding:25px 20px 40px;min-height:205px}.service-grid b{font:10px 'DM Mono',monospace;color:#db633e}.service-grid h3{font:500 21px 'Space Grotesk',sans-serif;margin:40px 0 15px}.service-grid p{color:var(--muted);font-size:12px;line-height:1.6}.home-contact{background:var(--ink);color:white;padding:115px max(5vw,24px);display:flex;justify-content:space-between;align-items:end}.home-contact h2{font:500 65px/.95 'Space Grotesk',sans-serif;letter-spacing:-.07em;margin:22px 0 0}.home-contact div>p:not(.eyebrow){color:#b9c6c0;font-size:13px;line-height:1.7;margin-bottom:28px}.button.light{background:var(--lime);color:var(--ink);display:inline-block}.button.light b{color:var(--ink)}.modal-backdrop{position:fixed;inset:0;z-index:10;background:rgba(23,33,31,.7);display:grid;place-items:center;padding:24px}.brief-modal{position:relative;width:min(100%,560px);background:var(--paper);padding:48px}.brief-modal h2{font:500 48px/.98 'Space Grotesk',sans-serif;letter-spacing:-.06em;margin:18px 0 35px}.modal-close{position:absolute;top:18px;right:20px;border:0;background:transparent;font-size:30px;cursor:pointer;color:var(--ink)}form label{display:block;font:10px 'DM Mono',monospace;text-transform:uppercase;color:var(--muted);margin-bottom:20px}form input{display:block;width:100%;border:0;border-bottom:1px solid var(--line);background:transparent;padding:11px 0;outline:none;font:14px 'Manrope',sans-serif}form input:focus{border-color:var(--ink)}form .button{margin-top:12px}.toast{position:fixed;right:24px;bottom:24px;z-index:20;background:var(--lime);color:var(--ink);padding:16px 20px;font-size:13px;font-weight:700}@media(max-width:700px){.home-hero{min-height:650px;margin-top:10px}.hero-image{width:90%;height:430px}.hero-copy{width:90%;padding-bottom:42px}.hero-copy h1{font-size:60px}.section-grid{display:block;padding:90px 7vw}.section-label{margin-bottom:35px}.section-grid img{margin-top:45px}.section-heading,.home-contact{display:block}.service-grid{grid-template-columns:1fr 1fr;margin-top:40px}.home-contact h2{font-size:53px;margin-bottom:55px}.brief-modal{padding:38px 24px}.brief-modal h2{font-size:40px}}`,
  ],
})
export class HomePage {
  private readonly catalog = inject(ProductCatalogService);
  readonly products = this.catalog.products.slice(0, 8);
  readonly cart = inject(CartService);
  private readonly analytics = inject(AnalyticsService);
  addProduct(product: typeof this.products[number]) { this.cart.add(product, 1, 'home_page'); }
  @HostListener('click', ['$event'])
  trackProductLink(event: MouseEvent) {
    const href = (event.target as HTMLElement).closest('a')?.getAttribute('href');
    const productId = Number(href?.match(/^\/product\/(\d+)$/)?.[1]);
    const product = this.catalog.getById(productId);
    if (product) this.analytics.track('product_details_clicked', 'home_page', { id: product.id, title: product.title, sku: product.sku });
  }
  isBriefFormOpen = false;
  isSubmitted = false;
  brief = { name: '', email: '', phone: '', address: '' };

  openBriefForm() { this.isBriefFormOpen = true; this.isSubmitted = false; this.analytics.track('brief_form_opened', 'home_page', { form_name: 'bring_us_a_brief' }); }
  closeBriefForm() { this.isBriefFormOpen = false; this.analytics.track('brief_form_closed', 'home_page', { form_name: 'bring_us_a_brief' }); }
  submitBrief() {
    this.analytics.track('lead_form_submit', 'home_page', { form_name: 'bring_us_a_brief', ...this.brief });
    this.isBriefFormOpen = false;
    this.isSubmitted = true;
    this.brief = { name: '', email: '', phone: '', address: '' };
  }
}

