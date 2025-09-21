import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  duration?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

@Component({
  selector: 'app-activity-card',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.css'
})
export class ActivityCardComponent {
  @Input() activity!: Activity;
  @Input() variant: 'suggestion' | 'result' = 'suggestion';
  @Output() add = new EventEmitter<Activity>();

  onAddActivity(): void {
    this.add.emit(this.activity);
  }
}
