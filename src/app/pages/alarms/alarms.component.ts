import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { DataTableComponent, TableColumn, TableAction } from '../../components/data-table/data-table.component';

export interface Alarm {
  id: string;
  nombre: string;
  hora: string;
  frecuencia: string;
  estado: { status: 'active' | 'inactive'; text: string };
}

@Component({
  selector: 'app-alarms',
  imports: [
    CommonModule,
    NavbarComponent,
    CardComponent,
    ButtonComponent,
    SearchInputComponent,
    DataTableComponent
  ],
  templateUrl: './alarms.component.html',
  styleUrl: './alarms.component.css'
})
export class AlarmsComponent implements OnInit {
  // User data for navbar
  userName = 'Cuenta';
  userAvatar = '👨‍💻';
  notificationCount = 3;
  messageCount = 2;

  // Search and filter
  searchValue = '';
  selectedStatus = 'todos';
  statusOptions = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'active', label: 'Activos' },
    { value: 'inactive', label: 'Inactivos' }
  ];

  // Table configuration
  columns: TableColumn[] = [
    { key: 'nombre', label: 'Nombre', sortable: true, width: '30%' },
    { key: 'hora', label: 'Hora', sortable: true, width: '20%' },
    { key: 'frecuencia', label: 'Frecuencia', sortable: true, width: '25%' },
    { key: 'estado', label: 'Estado', type: 'badge', width: '15%' }
  ];

  actions: TableAction[] = [
    { icon: '✏️', label: 'Editar', color: 'primary', action: 'edit' },
    { icon: '🗑️', label: 'Eliminar', color: 'error', action: 'delete' }
  ];

  // Sample data
  allAlarms: Alarm[] = [
    {
      id: '1',
      nombre: 'Reunión de trabajo',
      hora: '09:00 AM',
      frecuencia: 'Lunes a Viernes',
      estado: { status: 'active', text: 'Activo' }
    },
    {
      id: '2',
      nombre: 'Medicación matutina',
      hora: '08:00 AM',
      frecuencia: 'Diario',
      estado: { status: 'active', text: 'Activo' }
    },
    {
      id: '3',
      nombre: 'Ejercicio',
      hora: '06:30 AM',
      frecuencia: 'Lunes, Miércoles, Viernes',
      estado: { status: 'inactive', text: 'Inactivo' }
    },
    {
      id: '4',
      nombre: 'Llamada familia',
      hora: '07:00 PM',
      frecuencia: 'Semanal',
      estado: { status: 'active', text: 'Activo' }
    },
    {
      id: '5',
      nombre: 'Descanso trabajo',
      hora: '03:00 PM',
      frecuencia: 'Lunes a Viernes',
      estado: { status: 'inactive', text: 'Inactivo' }
    },
    {
      id: '6',
      nombre: 'Lectura antes de dormir',
      hora: '10:00 PM',
      frecuencia: 'Diario',
      estado: { status: 'active', text: 'Activo' }
    }
  ];

  filteredAlarms: Alarm[] = [];
  loading = false;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit() {
    this.filteredAlarms = [...this.allAlarms];
  }

  onSearch(value: string) {
    this.searchValue = value;
    this.applyFilters();
  }

  onStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus = target.value;
    this.applyFilters();
  }

  onAddAlarm() {
    console.log('Add new alarm');
    // Here you would typically open a modal or navigate to a form
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }) {
    this.sortColumn = event.column;
    this.sortDirection = event.direction;
    this.applySort();
  }

  onActionClick(event: { action: string; item: Alarm }) {
    console.log('Action clicked:', event.action, 'on item:', event.item);
    
    switch (event.action) {
      case 'edit':
        this.editAlarm(event.item);
        break;
      case 'delete':
        this.deleteAlarm(event.item);
        break;
    }
  }

  private applyFilters() {
    let filtered = [...this.allAlarms];

    // Apply search filter
    if (this.searchValue.trim()) {
      const searchLower = this.searchValue.toLowerCase();
      filtered = filtered.filter(alarm => 
        alarm.nombre.toLowerCase().includes(searchLower) ||
        alarm.hora.toLowerCase().includes(searchLower) ||
        alarm.frecuencia.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (this.selectedStatus !== 'todos') {
      filtered = filtered.filter(alarm => 
        alarm.estado.status === this.selectedStatus
      );
    }

    this.filteredAlarms = filtered;
    this.applySort();
  }

  private applySort() {
    if (!this.sortColumn) return;

    this.filteredAlarms.sort((a, b) => {
      let aValue = a[this.sortColumn as keyof Alarm];
      let bValue = b[this.sortColumn as keyof Alarm];

      // Handle estado object
      if (this.sortColumn === 'estado') {
        aValue = (a.estado as any).text;
        bValue = (b.estado as any).text;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return this.sortDirection === 'asc' ? comparison : -comparison;
      }

      return 0;
    });
  }

  private editAlarm(alarm: Alarm) {
    console.log('Editing alarm:', alarm);
    // Implement edit functionality
  }

  private deleteAlarm(alarm: Alarm) {
    console.log('Deleting alarm:', alarm);
    // Implement delete functionality
    if (confirm(`¿Estás seguro de que quieres eliminar la alarma "${alarm.nombre}"?`)) {
      this.allAlarms = this.allAlarms.filter(a => a.id !== alarm.id);
      this.applyFilters();
    }
  }
}
