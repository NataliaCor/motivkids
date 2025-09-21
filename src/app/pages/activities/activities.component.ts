import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ActivityCardComponent, Activity } from '../../components/activity-card/activity-card.component';

@Component({
  selector: 'app-activities',
  imports: [
    CommonModule,
    NavbarComponent,
    SearchInputComponent,
    ActivityCardComponent
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements OnInit {
  // Navbar data
  userName = 'Ana García';
  userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana';
  notificationCount = 3;
  messageCount = 7;

  // Activities data
  suggestedActivities: Activity[] = [];
  allActivities: Activity[] = [];
  searchResults: Activity[] = [];
  searchValue = '';
  isSearching = false;

  ngOnInit() {
    this.loadActivities();
  }

  private loadActivities() {
    // Suggested activities - these are featured/recommended
    this.suggestedActivities = [
      {
        id: '1',
        title: 'Meditación guiada',
        description: 'Relájate con ejercicios de respiración y mindfulness para niños',
        icon: '🧘‍♀️',
        category: 'Bienestar',
        duration: '10 min',
        difficulty: 'easy'
      },
      {
        id: '2',
        title: 'Lectura diaria',
        description: 'Desarrolla el hábito de leer un cuento antes de dormir',
        icon: '📚',
        category: 'Educación',
        duration: '15 min',
        difficulty: 'easy'
      },
      {
        id: '3',
        title: 'Ejercicio matutino',
        description: 'Rutina de ejercicios suaves para empezar el día con energía',
        icon: '🏃‍♂️',
        category: 'Deporte',
        duration: '20 min',
        difficulty: 'medium'
      },
      {
        id: '4',
        title: 'Arte creativo',
        description: 'Dibuja, pinta o crea manualidades para expresar tu creatividad',
        icon: '🎨',
        category: 'Arte',
        duration: '30 min',
        difficulty: 'easy'
      }
    ];

    // All activities - complete catalog
    this.allActivities = [
      ...this.suggestedActivities,
      {
        id: '5',
        title: 'Cocina saludable',
        description: 'Aprende a preparar snacks nutritivos y deliciosos',
        icon: '👩‍🍳',
        category: 'Vida práctica',
        duration: '25 min',
        difficulty: 'medium'
      },
      {
        id: '6',
        title: 'Jardinería infantil',
        description: 'Cuida plantas y aprende sobre la naturaleza',
        icon: '🌱',
        category: 'Naturaleza',
        duration: '15 min',
        difficulty: 'easy'
      },
      {
        id: '7',
        title: 'Música y ritmo',
        description: 'Explora instrumentos musicales y crea tus propias melodías',
        icon: '🎵',
        category: 'Música',
        duration: '20 min',
        difficulty: 'easy'
      },
      {
        id: '8',
        title: 'Ciencia divertida',
        description: 'Experimentos seguros y fascinantes para pequeños científicos',
        icon: '🔬',
        category: 'Ciencia',
        duration: '35 min',
        difficulty: 'hard'
      },
      {
        id: '9',
        title: 'Yoga para niños',
        description: 'Posturas y estiramientos adaptados para mejorar flexibilidad',
        icon: '🧘‍♂️',
        category: 'Bienestar',
        duration: '15 min',
        difficulty: 'medium'
      },
      {
        id: '10',
        title: 'Construcción creativa',
        description: 'Construye estructuras con bloques, legos o materiales reciclados',
        icon: '🏗️',
        category: 'Construcción',
        duration: '40 min',
        difficulty: 'medium'
      }
    ];
  }

  onSearch(value: string) {
    this.searchValue = value;
    this.isSearching = value.trim().length > 0;
    
    if (this.isSearching) {
      const searchTerm = value.toLowerCase().trim();
      this.searchResults = this.allActivities.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm) ||
        activity.description.toLowerCase().includes(searchTerm) ||
        activity.category.toLowerCase().includes(searchTerm)
      );
    } else {
      this.searchResults = [];
    }
  }

  onAddActivity(activity: Activity) {
    console.log('Adding activity:', activity);
    // Here you would typically add the activity to the user's schedule
    // Show success message, update state, etc.
    alert(`¡Actividad "${activity.title}" agregada exitosamente!`);
  }
}
