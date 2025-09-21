import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SupportItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
  duration?: string;
  type: 'faq' | 'contact' | 'tutorial';
}

export interface ContactOption {
  type: 'phone' | 'email' | 'chat';
  label: string;
  value: string;
  schedule?: string;
  available: boolean;
}

@Component({
  selector: 'app-support-card',
  imports: [CommonModule],
  templateUrl: './support-card.component.html',
  styleUrl: './support-card.component.css'
})
export class SupportCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';
  @Input() iconColor: 'turquoise' | 'green' | 'blue' = 'turquoise';
  @Input() type: 'faq' | 'contact' | 'tutorial' = 'faq';
  @Input() items: SupportItem[] = [];
  @Input() contactOptions: ContactOption[] = [];

  onItemClick(item: SupportItem): void {
    if (item.url) {
      // In a real app, this would navigate or open the content
      console.log('Opening:', item.title, item.url);
    }
  }

  onContactClick(option: ContactOption): void {
    console.log('Contacting via:', option.type, option.value);
    // In a real app, this would initiate contact (phone, email, chat)
  }
}
