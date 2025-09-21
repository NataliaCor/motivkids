import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Activity {
  id: string;
  name: string;
  icon: string;
  iconColor: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  completedTime: string;
  description?: string;
}

@Component({
  selector: 'app-activity-list',
  imports: [CommonModule],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent {
  @Input() activities: Activity[] = [];
  @Input() title: string = 'Actividades Recientes';
  @Input() showAll: boolean = false;
  @Input() maxItems: number = 5;

  get displayedActivities() {
    if (this.showAll) {
      return this.activities;
    }
    return this.activities.slice(0, this.maxItems);
  }
}
