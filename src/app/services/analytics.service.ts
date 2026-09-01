import { Injectable } from '@angular/core';

export type EventSource = 'home_page' | 'product_listing_page' | 'product_detail_page' | 'cart_drawer';

export interface EventDataValue {
  event: string;
  customer_id: string | null;
  source: EventSource;
  [key: string]: unknown;
}

declare global {
  interface Window {
    EventData: EventDataValue;
    dataLayer: Record<string, unknown>[];
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  track(event: string, source: EventSource, data: Record<string, unknown> = {}) {
    const eventData: EventDataValue = {
      event,
      customer_id: null,
      source,
      ...data,
    };

    window.EventData = eventData;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, EventData: eventData });
  }
}
