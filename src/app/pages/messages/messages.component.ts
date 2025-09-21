import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { MessageItemComponent, Message } from '../../components/message-item/message-item.component';
import { RelationshipType } from '../../components/relationship-badge/relationship-badge.component';

@Component({
  selector: 'app-messages',
  imports: [
    CommonModule, 
    NavbarComponent, 
    CardComponent, 
    ButtonComponent, 
    SearchInputComponent, 
    MessageItemComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  // Navbar data
  userName = 'Ana García';
  userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana';
  notificationCount = 3;
  messageCount = 7;

  // Messages data
  allMessages: Message[] = [];
  filteredMessages: Message[] = [];
  searchValue = '';
  selectedFilter = 'todos';

  filterOptions = [
    { value: 'todos', label: 'Todos los mensajes' },
    { value: 'mama', label: 'De mamá' },
    { value: 'papa', label: 'De papá' },
    { value: 'abuela', label: 'De abuela' },
    { value: 'sistema', label: 'Del sistema' },
    { value: 'unread', label: 'No leídos' }
  ];

  ngOnInit() {
    this.loadMessages();
    this.applyFilters();
  }

  private loadMessages() {
    this.allMessages = [
      {
        id: '1',
        senderName: 'María García',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        relationshipType: 'mama' as RelationshipType,
        message: 'Hola mi amor, ¿ya terminaste tus tareas? Recuerda que después tenemos que ir al supermercado juntos.',
        timestamp: 'Hoy 14:30',
        timeAgo: 'Hace 2 horas',
        isRead: false
      },
      {
        id: '2',
        senderName: 'Sistema MotivKids',
        senderAvatar: '',
        relationshipType: 'sistema' as RelationshipType,
        message: '¡Felicitaciones! Has completado 5 tareas esta semana. Sigue así y podrás ganar una recompensa especial.',
        timestamp: 'Ayer 20:15',
        timeAgo: 'Ayer',
        isRead: true
      },
      {
        id: '3',
        senderName: 'Carlos García',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
        relationshipType: 'papa' as RelationshipType,
        message: 'Campeón, vi que organizaste tu cuarto perfectamente. ¡Estoy muy orgulloso de ti!',
        timestamp: 'Ayer 18:45',
        timeAgo: 'Ayer',
        isRead: true
      },
      {
        id: '4',
        senderName: 'Elena Rodríguez',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
        relationshipType: 'abuela' as RelationshipType,
        message: 'Mi nieto querido, la abuela te extraña mucho. ¿Cuándo vienes a visitarme? Tengo galletas recién horneadas esperándote.',
        timestamp: 'Lun 16:20',
        timeAgo: 'Hace 3 días',
        isRead: false
      },
      {
        id: '5',
        senderName: 'Sistema MotivKids',
        senderAvatar: '',
        relationshipType: 'sistema' as RelationshipType,
        message: 'Recordatorio: Tu alarma "Tiempo de estudio" está programada para las 16:00. ¡Prepárate para ser productivo!',
        timestamp: 'Lun 15:30',
        timeAgo: 'Hace 3 días',
        isRead: true
      },
      {
        id: '6',
        senderName: 'María García',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        relationshipType: 'mama' as RelationshipType,
        message: 'No olvides cepillarte los dientes después del almuerzo. Te amo mucho, hijo.',
        timestamp: 'Dom 13:15',
        timeAgo: 'Hace 4 días',
        isRead: true
      },
      {
        id: '7',
        senderName: 'Carlos García',
        senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
        relationshipType: 'papa' as RelationshipType,
        message: 'El fin de semana podemos ir al parque a jugar fútbol. ¿Qué te parece?',
        timestamp: 'Sab 10:30',
        timeAgo: 'Hace 5 días',
        isRead: false
      }
    ];
  }

  onSearch(value: string) {
    this.searchValue = value;
    this.applyFilters();
  }

  onFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedFilter = target.value;
    this.applyFilters();
  }

  onAddMessage() {
    console.log('Add new message');
    // Here you would typically open a modal or navigate to a form
  }

  onEditMessage(message: Message) {
    console.log('Editing message:', message);
    // Implement edit functionality
  }

  onDeleteMessage(message: Message) {
    console.log('Deleting message:', message);
    if (confirm(`¿Estás seguro de que quieres eliminar el mensaje de ${message.senderName}?`)) {
      this.allMessages = this.allMessages.filter(m => m.id !== message.id);
      this.applyFilters();
    }
  }

  private applyFilters() {
    let filtered = [...this.allMessages];

    // Apply search filter
    if (this.searchValue.trim()) {
      const searchTerm = this.searchValue.toLowerCase().trim();
      filtered = filtered.filter(message => 
        message.senderName.toLowerCase().includes(searchTerm) ||
        message.message.toLowerCase().includes(searchTerm)
      );
    }

    // Apply relationship filter
    if (this.selectedFilter !== 'todos') {
      if (this.selectedFilter === 'unread') {
        filtered = filtered.filter(message => !message.isRead);
      } else {
        filtered = filtered.filter(message => 
          message.relationshipType === this.selectedFilter
        );
      }
    }

    this.filteredMessages = filtered;
  }
}
