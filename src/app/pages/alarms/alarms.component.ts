import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { DataTableComponent, TableColumn, TableAction } from '../../components/data-table/data-table.component';
import { AlarmModalComponent, AlarmFormData } from '../../components/alarm-modal/alarm-modal.component';

export interface Alarm {
  id: string;
  nombre: string;
  hora: string;
  periodo: 'AM' | 'PM';
  tono: string;
  recomendacion: string;
  dias: string[];
  repetir: 'nunca' | 'diario' | 'semanal' | 'mensual';
  actividadVinculada: string;
  frecuencia: string; // Derived field for display
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
    DataTableComponent,
    AlarmModalComponent
  ],
  templateUrl: './alarms.component.html',
  styleUrl: './alarms.component.css'
})
export class AlarmsComponent implements OnInit {
  // User data for navbar
  userName = 'Ana García';
  userAvatar = 'AG';
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
    { icon: 'bi bi-pencil', label: 'Editar', color: 'primary', action: 'edit' },
    { icon: 'bi bi-trash', label: 'Eliminar', color: 'error', action: 'delete' }
  ];

  // Sample data
  allAlarms: Alarm[] = [
    {
      id: '1',
      nombre: 'Reunión de trabajo',
      hora: '09:00',
      periodo: 'AM',
      tono: 'clasico',
      recomendacion: 'Prepara tu agenda y mantente puntual',
      dias: ['L', 'M', 'X', 'J', 'V'],
      repetir: 'semanal',
      actividadVinculada: 'ejercicio-cardio',
      frecuencia: 'Lunes a Viernes',
      estado: { status: 'active', text: 'Activo' }
    },
    {
      id: '2',
      nombre: 'Medicación matutina',
      hora: '08:00',
      periodo: 'AM',
      tono: 'suave',
      recomendacion: 'Toma tu medicación con un vaso de agua',
      dias: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
      repetir: 'diario',
      actividadVinculada: 'hidratacion',
      frecuencia: 'Diario',
      estado: { status: 'active', text: 'Activo' }
    },
    {
      id: '3',
      nombre: 'Ejercicio',
      hora: '06:30',
      periodo: 'AM',
      tono: 'energico',
      recomendacion: 'Mantén una rutina constante de ejercicio',
      dias: ['L', 'X', 'V'],
      repetir: 'semanal',
      actividadVinculada: 'estiramiento-matutino',
      frecuencia: 'Lunes, Miércoles, Viernes',
      estado: { status: 'inactive', text: 'Inactivo' }
    },
    {
      id: '4',
      nombre: 'Llamada familia',
      hora: '07:00',
      periodo: 'PM',
      tono: 'melodico',
      recomendacion: 'Mantén contacto regular con tus seres queridos',
      dias: ['D'],
      repetir: 'semanal',
      actividadVinculada: 'descanso',
      frecuencia: 'Semanal',
      estado: { status: 'active', text: 'Activo' }
    },
    {
      id: '5',
      nombre: 'Descanso trabajo',
      hora: '03:00',
      periodo: 'PM',
      tono: 'naturaleza',
      recomendacion: 'Tómate un descanso para relajarte',
      dias: ['L', 'M', 'X', 'J', 'V'],
      repetir: 'semanal',
      actividadVinculada: 'meditacion',
      frecuencia: 'Lunes a Viernes',
      estado: { status: 'inactive', text: 'Inactivo' }
    },
    {
      id: '6',
      nombre: 'Lectura antes de dormir',
      hora: '10:00',
      periodo: 'PM',
      tono: 'suave',
      recomendacion: 'Dedica tiempo a la lectura antes de dormir',
      dias: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
      repetir: 'diario',
      actividadVinculada: 'lectura',
      frecuencia: 'Diario',
      estado: { status: 'active', text: 'Activo' }
    }
  ];

  filteredAlarms: Alarm[] = [];
  loading = false;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Modal state
  isModalOpen = false;
  modalMode: 'add' | 'edit' = 'add';
  editingAlarm: Alarm | null = null;

  ngOnInit() {
    this.filteredAlarms = [...this.allAlarms];
  }

  get initialAlarmData(): Partial<AlarmFormData> | null {
    if (this.modalMode === 'edit' && this.editingAlarm) {
      return {
        id: this.editingAlarm.id,
        nombre: this.editingAlarm.nombre,
        hora: this.editingAlarm.hora,
        periodo: this.editingAlarm.periodo,
        tono: this.editingAlarm.tono,
        recomendacion: this.editingAlarm.recomendacion,
        dias: [...this.editingAlarm.dias],
        repetir: this.editingAlarm.repetir,
        actividadVinculada: this.editingAlarm.actividadVinculada
      };
    }
    return null;
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
    this.modalMode = 'add';
    this.editingAlarm = null;
    this.isModalOpen = true;
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
    this.modalMode = 'edit';
    this.editingAlarm = alarm;
    this.isModalOpen = true;
  }

  private deleteAlarm(alarm: Alarm) {
    console.log('Deleting alarm:', alarm);
    // Implement delete functionality
    if (confirm(`¿Estás seguro de que quieres eliminar la alarma "${alarm.nombre}"?`)) {
      this.allAlarms = this.allAlarms.filter(a => a.id !== alarm.id);
      this.applyFilters();
    }
  }

  onModalClose() {
    this.isModalOpen = false;
    this.editingAlarm = null;
  }

  onAlarmSave(alarmData: AlarmFormData) {
    if (this.modalMode === 'add') {
      // Add new alarm
      const newAlarm: Alarm = {
        id: Date.now().toString(),
        ...alarmData,
        frecuencia: this.generateFrequencyText(alarmData.dias, alarmData.repetir),
        estado: { status: 'active', text: 'Activo' }
      };
      this.allAlarms.push(newAlarm);
    } else if (this.modalMode === 'edit' && this.editingAlarm) {
      // Update existing alarm
      const index = this.allAlarms.findIndex(a => a.id === this.editingAlarm!.id);
      if (index > -1) {
        this.allAlarms[index] = {
          ...this.editingAlarm,
          ...alarmData,
          frecuencia: this.generateFrequencyText(alarmData.dias, alarmData.repetir)
        };
      }
    }

    this.applyFilters();
    this.onModalClose();
  }

  private generateFrequencyText(dias: string[], repetir: string): string {
    if (dias.length === 7) {
      return 'Diario';
    } else if (dias.length === 5 && ['L', 'M', 'X', 'J', 'V'].every(d => dias.includes(d))) {
      return 'Lunes a Viernes';
    } else if (dias.length === 2 && dias.includes('S') && dias.includes('D')) {
      return 'Fines de semana';
    } else {
      const dayNames: { [key: string]: string } = {
        'L': 'Lun', 'M': 'Mar', 'X': 'Mié', 'J': 'Jue', 'V': 'Vie', 'S': 'Sáb', 'D': 'Dom'
      };
      return dias.map(d => dayNames[d]).join(', ');
    }
  }
}
