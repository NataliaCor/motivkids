import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { RelationshipBadgeComponent, RelationshipType } from '../relationship-badge/relationship-badge.component';

export interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  relationshipType: RelationshipType;
  message: string;
  timestamp: string;
  timeAgo: string;
  isRead: boolean;
}

@Component({
  selector: 'app-message-item',
  imports: [CommonModule, AvatarComponent, RelationshipBadgeComponent],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message!: Message;
  @Output() edit = new EventEmitter<Message>();
  @Output() delete = new EventEmitter<Message>();

  onEdit(): void {
    this.edit.emit(this.message);
  }

  onDelete(): void {
    this.delete.emit(this.message);
  }
}
