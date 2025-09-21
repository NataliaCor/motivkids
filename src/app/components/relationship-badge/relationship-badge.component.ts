import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type RelationshipType = 'mama' | 'papa' | 'abuela' | 'abuelo' | 'sistema' | 'usuario';

@Component({
  selector: 'app-relationship-badge',
  imports: [CommonModule],
  templateUrl: './relationship-badge.component.html',
  styleUrl: './relationship-badge.component.css'
})
export class RelationshipBadgeComponent {
  @Input() type: RelationshipType = 'usuario';
  @Input() customText?: string;
  @Input() size: 'small' | 'medium' = 'small';

  get badgeText(): string {
    if (this.customText) {
      return this.customText;
    }
    
    switch (this.type) {
      case 'mama': return 'De mamá';
      case 'papa': return 'De papá';
      case 'abuela': return 'De abuela';
      case 'abuelo': return 'De abuelo';
      case 'sistema': return 'Del sistema';
      case 'usuario': return 'De mí';
      default: return 'Usuario';
    }
  }

  get badgeClass(): string {
    return `badge-${this.type} badge-${this.size}`;
  }
}
