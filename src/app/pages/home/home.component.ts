import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

interface DashboardActivity {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // User data
  userName = 'Ana García';
  userAvatar = 'AG';
  notificationCount = 3;
  messageCount = 2;

  // Recent activities data
  recentActivities: DashboardActivity[] = [
    {
      id: '1',
      title: 'Ejercicio matutino',
      subtitle: 'Completado hace 2 horas',
      icon: 'bi bi-lightning',
      color: '#6A951F'
    },
    {
      id: '2',
      title: 'Lectura de relajación',
      subtitle: 'Completado hace 4 horas',
      icon: 'bi bi-book',
      color: '#91B472'
    },
    {
      id: '3',
      title: 'Meditación guiada',
      subtitle: 'Completado ayer',
      icon: 'bi bi-circle',
      color: '#EEC925'
    },
    {
      id: '4',
      title: 'Arte terapéutico',
      subtitle: 'Completado hace 2 días',
      icon: 'bi bi-palette',
      color: '#9FDFE0'
    },
    {
      id: '5',
      title: 'Respiración consciente',
      subtitle: 'Completado hace 3 días',
      icon: 'bi bi-wind',
      color: '#6A951F'
    }
  ];

  // Chart data for emotions history (simplified for now)
  chartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    mood: [6, 7, 5, 8, 7, 9, 8],
    energy: [5, 6, 4, 7, 6, 8, 7]
  };
}