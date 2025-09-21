import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeStatus = 'active' | 'inactive' | 'pending' | 'success' | 'warning' | 'error';
export type BadgeSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-status-badge',
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  @Input() status: BadgeStatus = 'active';
  @Input() text: string = '';
  @Input() size: BadgeSize = 'medium';
  @Input() rounded: boolean = true;

  get badgeText(): string {
    if (this.text) {
      return this.text;
    }
    
    // Default text based on status
    const statusTexts: Record<BadgeStatus, string> = {
      active: 'Activo',
      inactive: 'Inactivo',
      pending: 'Pendiente',
      success: 'Exitoso',
      warning: 'Advertencia',
      error: 'Error'
    };
    
    return statusTexts[this.status];
  }

  get badgeClasses(): string {
    const classes = ['status-badge'];
    
    classes.push(`status-badge--${this.status}`);
    classes.push(`status-badge--${this.size}`);
    
    if (this.rounded) {
      classes.push('status-badge--rounded');
    }
    
    return classes.join(' ');
  }
}
