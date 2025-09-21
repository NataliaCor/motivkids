import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() padding: 'small' | 'medium' | 'large' = 'medium';
  @Input() shadow: 'none' | 'small' | 'medium' | 'large' = 'medium';
  @Input() borderRadius: 'small' | 'medium' | 'large' = 'medium';
  @Input() background: 'white' | 'gray' | 'transparent' = 'white';
  @Input() hover: boolean = false;
}
