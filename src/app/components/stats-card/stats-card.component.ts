import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-stats-card',
  imports: [CommonModule, CardComponent],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css'
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: number | string = '';
  @Input() icon: string = '';
  @Input() iconColor: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' = 'primary';
  @Input() trend?: 'up' | 'down' | 'stable';
  @Input() trendValue?: string;
}
