import { Injectable, signal, computed, inject } from '@angular/core';
import { CartItem, Product } from '../models/product';
import { ProductCatalogService } from './product-catalog.service';
import { AnalyticsService, EventSource } from './analytics.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly catalog = inject(ProductCatalogService);
  private readonly analytics = inject(AnalyticsService);
  private readonly storageKey = 'northstar-cart';
  private readonly itemsSignal = signal<CartItem[]>(this.load());
  readonly items = this.itemsSignal.asReadonly();
  readonly count = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  readonly subtotal = computed(() => this.items().reduce((total, item) => total + item.price * item.quantity, 0));

  readonly drawerOpen = signal(false);
  add(product: Product, quantity = 1, source: EventSource = 'product_detail_page') {
    this.update(product.id, quantity, true);
    this.analytics.track('add_to_cart', source, this.productEventData(product, quantity));
    this.drawerOpen.set(true);
    this.analytics.track('cart_drawer_opened', source, this.cartEventData());
  }
  closeDrawer() { this.drawerOpen.set(false); }
  increase(id: number) { this.updateCartItem(id, 1); }
  decrease(id: number) { this.updateCartItem(id, -1); }
  remove(id: number) {
    const item = this.items().find((cartItem) => cartItem.id === id);
    this.itemsSignal.update((items) => items.filter((cartItem) => cartItem.id !== id));
    this.persist();
    if (item) this.analytics.track('cart_item_removed', 'cart_drawer', { ...this.productEventData(item, item.quantity), ...this.cartEventData() });
  }

  private updateCartItem(id: number, amount: number) {
    const item = this.items().find((cartItem) => cartItem.id === id);
    this.update(id, amount);
    if (item) {
      const quantity = this.items().find((cartItem) => cartItem.id === id)?.quantity ?? item.quantity;
      this.analytics.track('cart_item_quantity_updated', 'cart_drawer', { ...this.productEventData(item, quantity), ...this.cartEventData() });
    }
  }

  private update(id: number, amount: number, addIfMissing = false) {
    this.itemsSignal.update((items) => {
      const exists = items.some((item) => item.id === id);
      if (!exists && addIfMissing) {
        const product = this.findProduct(id);
        return product ? [...items, { ...product, quantity: amount }] : items;
      }
      return items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item);
    });
    this.persist();
  }

  private findProduct(id: number) { return this.catalog.getById(id); }
  private productEventData(product: Product, quantity: number) { return { id: product.id, title: product.title, sku: product.sku, product_quantity: quantity }; }
  private cartEventData() { return { cart_items: this.count(), product_ids: this.items().map((item) => item.id) }; }
  private load(): CartItem[] { try { return JSON.parse(localStorage.getItem(this.storageKey) || '[]'); } catch { return []; } }
  private persist() { localStorage.setItem(this.storageKey, JSON.stringify(this.items())); }
}
