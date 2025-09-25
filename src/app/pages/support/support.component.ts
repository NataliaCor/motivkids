import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SupportCardComponent, SupportItem, ContactOption } from '../../components/support-card/support-card.component';

@Component({
  selector: 'app-support',
  imports: [
    CommonModule,
    NavbarComponent,
    ButtonComponent,
    SupportCardComponent
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit {
  // Navbar data
  userName = 'Ana García';
  userAvatar = 'AG';
  notificationCount = 3;
  messageCount = 7;

  // Support data
  faqItems: SupportItem[] = [];
  contactOptions: ContactOption[] = [];
  tutorialItems: SupportItem[] = [];

  ngOnInit() {
    this.loadSupportData();
  }

  private loadSupportData() {
    // FAQ Items
    this.faqItems = [
      {
        id: '1',
        title: '¿Cómo crear una nueva alarma?',
        url: '/help/create-alarm',
        type: 'faq'
      },
      {
        id: '2',
        title: '¿Cómo cambiar mi contraseña?',
        url: '/help/change-password',
        type: 'faq'
      },
      {
        id: '3',
        title: '¿Cómo agregar una nueva actividad?',
        url: '/help/add-activity',
        type: 'faq'
      },
      {
        id: '4',
        title: '¿Cómo gestionar mis mensajes?',
        url: '/help/manage-messages',
        type: 'faq'
      },
      {
        id: '5',
        title: '¿Cómo personalizar mi perfil?',
        url: '/help/customize-profile',
        type: 'faq'
      }
    ];

    // Contact Options
    this.contactOptions = [
      {
        type: 'phone',
        label: 'Teléfono de Soporte',
        value: '+1 (555) 123-4567',
        schedule: 'Lun - Vie: 9:00 AM - 6:00 PM',
        available: true
      },
      {
        type: 'chat',
        label: 'Chat en Vivo',
        value: 'Disponible ahora',
        schedule: '24/7',
        available: true
      },
      {
        type: 'email',
        label: 'Correo Electrónico',
        value: 'soporte@motivkids.com',
        schedule: 'Respuesta en 24 horas',
        available: true
      }
    ];

    // Tutorial Items
    this.tutorialItems = [
      {
        id: '1',
        title: 'Primeros pasos en MotivKids',
        description: 'Introducción básica a la plataforma',
        duration: '5:30',
        url: '/tutorials/getting-started',
        type: 'tutorial'
      },
      {
        id: '2',
        title: 'Gestión de alarmas y recordatorios',
        description: 'Cómo crear y configurar alarmas',
        duration: '8:15',
        url: '/tutorials/alarm-management',
        type: 'tutorial'
      },
      {
        id: '3',
        title: 'Explorando actividades',
        description: 'Descubre y agrega nuevas actividades',
        duration: '6:45',
        url: '/tutorials/activities',
        type: 'tutorial'
      },
      {
        id: '4',
        title: 'Sistema de mensajes',
        description: 'Comunicación familiar efectiva',
        duration: '7:20',
        url: '/tutorials/messaging',
        type: 'tutorial'
      },
      {
        id: '5',
        title: 'Configuración avanzada',
        description: 'Personaliza tu experiencia',
        duration: '10:00',
        url: '/tutorials/advanced-settings',
        type: 'tutorial'
      }
    ];
  }

  onViewFAQ() {
    console.log('Navigating to FAQ page');
    // Navigate to FAQ page or scroll to FAQ section
  }

  onStartTutorial() {
    console.log('Starting tutorial');
    // Start the tutorial flow
  }

  onContactSupport() {
    console.log('Opening contact support');
    // Open contact modal or navigate to contact page
  }
}
