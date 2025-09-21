import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { CardComponent } from '../../components/card/card.component';
import { ActivityListComponent, Activity } from '../../components/activity-list/activity-list.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, StatsCardComponent, CardComponent, ActivityListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // User data
  userName = 'Cuenta';
  userAvatar = '👨‍💻';
  notificationCount = 3;
  messageCount = 2;

  // Recent activities data
  recentActivities: Activity[] = [
    {
      id: '1',
      name: 'Ejercicio matutino',
      icon: '�‍♂️',
      iconColor: 'success',
      completedTime: 'Completado hace 2 horas',
      description: 'Rutina de ejercicios de 30 minutos'
    },
    {
      id: '2',
      name: 'Lectura de relajación',
      icon: '�',
      iconColor: 'secondary',
      completedTime: 'Completado hace 4 horas',
      description: 'Sesión de lectura tranquila'
    },
    {
      id: '3',
      name: 'Meditación guiada',
      icon: '🧘‍♀️',
      iconColor: 'accent',
      completedTime: 'Completado ayer',
      description: 'Meditación de mindfulness'
    },
    {
      id: '4',
      name: 'Arte terapéutico',
      icon: '🎨',
      iconColor: 'warning',
      completedTime: 'Completado hace 2 días',
      description: 'Sesión de arte creativo'
    },
    {
      id: '5',
      name: 'Respiración consciente',
      icon: '💨',
      iconColor: 'primary',
      completedTime: 'Completado hace 3 días',
      description: 'Ejercicios de respiración'
    }
  ];

  // Chart data for emotions history (simplified for now)
  chartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    mood: [6, 7, 5, 8, 7, 9, 8],
    energy: [5, 6, 4, 7, 6, 8, 7]
  };
}
