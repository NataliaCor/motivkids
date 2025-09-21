import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  @Input() src: string = '';
  @Input() alt: string = 'Avatar';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() initials: string = '';
  @Input() name: string = '';

  get avatarSize(): string {
    switch (this.size) {
      case 'small': return '32px';
      case 'medium': return '48px';
      case 'large': return '64px';
      default: return '48px';
    }
  }

  get showInitials(): boolean {
    return !this.src && !!(this.initials || this.name);
  }

  get displayInitials(): string {
    if (this.initials) {
      return this.initials.substring(0, 2).toUpperCase();
    }
    if (this.name) {
      const nameParts = this.name.split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
      }
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return 'U';
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }
}
