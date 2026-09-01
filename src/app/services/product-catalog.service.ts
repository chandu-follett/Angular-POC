import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductCatalogService {
  readonly products: Product[] = ([
    { id: 1, title: 'Form Study No. 01', price: 145, description: 'A sculptural desk object made to bring a little focus to your everyday rituals. Hand-finished in small batches.', images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'] },
    { id: 2, title: 'Field Notes Set', price: 28, description: 'Three soft-cover notebooks for ideas in progress, with recycled paper and a lay-flat binding.', images: ['https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=1200&q=85'] },
    { id: 3, title: 'Daily Carry Tote', price: 64, description: 'A generous, durable canvas tote designed for the workday and everything that follows it.', images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85'] },
    { id: 4, title: 'Studio Light', price: 210, description: 'Warm, directional light with a calm silhouette. A considered companion for desks, shelves and bedside tables.', images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85', 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85'] },
    { id: 5, title: 'Arc Tray', price: 52, description: 'A low-profile tray for keys, notes, and the small things that deserve a place.', images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'] },
    { id: 6, title: 'Quiet Mug', price: 32, description: 'A balanced stoneware mug with a generous handle and a soft matte glaze.', images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85'] },
    { id: 7, title: 'Grid Planner', price: 24, description: 'A practical weekly planner for making space for the work that matters.', images: ['https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=85'] },
    { id: 8, title: 'Linen Throw', price: 118, description: 'Washed linen with a weighty drape, made for slow mornings and open windows.', images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85'] },
    { id: 9, title: 'Desk Clock', price: 86, description: 'A small analog clock that keeps time quietly, without asking for attention.', images: ['https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=85'] },
    { id: 10, title: 'Oak Bookmark', price: 18, description: 'Solid oak bookmark with a natural oil finish and a simple cotton thread.', images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=85'] },
    { id: 11, title: 'Everyday Cap', price: 42, description: 'An unstructured cotton cap with a considered fit for everyday errands.', images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=85'] },
    { id: 12, title: 'Stone Candle', price: 46, description: 'A warm cedar and mineral candle poured into a reusable ceramic vessel.', images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85'] },
    { id: 13, title: 'Canvas Apron', price: 74, description: 'A hard-wearing canvas apron with deep pockets for hands-on afternoons.', images: ['https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=1200&q=85'] },
    { id: 14, title: 'Glass Carafe', price: 58, description: 'Clear, hand-blown glass for water, flowers, and the table between.', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85'] },
    { id: 15, title: 'Travel Journal', price: 36, description: 'A compact journal with thick paper for observations made far from home.', images: ['https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=85'] },
    { id: 16, title: 'Wool Cushion', price: 92, description: 'A textured wool cushion in a quiet natural tone for the reading corner.', images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85'] },
    { id: 17, title: 'Brass Pen', price: 29, description: 'A weighty brass pen that gets better with every mark and every year.', images: ['https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1200&q=85'] },
    { id: 18, title: 'Folded Wallet', price: 68, description: 'Slim vegetable-tanned leather wallet for the essentials and nothing more.', images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=85'] },
    { id: 19, title: 'Terracotta Pot', price: 39, description: 'A hand-shaped planter with an earthy finish for a windowsill companion.', images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=85'] },
    { id: 20, title: 'Weekend Blanket', price: 154, description: 'A generous cotton blanket for park days, road trips, and everything between.', images: ['https://images.unsplash.com/photo-1600369671236-e74521d4b7ad?auto=format&fit=crop&w=1200&q=85'] },
  ] as Omit<Product, 'sku'>[]).map((product) => ({ ...product, sku: `NS-${String(product.id).padStart(3, '0')}` }));

  getById(id: number) { return this.products.find((product) => product.id === id); }
}
