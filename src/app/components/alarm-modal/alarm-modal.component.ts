import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';

export interface AlarmFormData {
  id?: string;
  nombre: string;
  hora: string;
  periodo: 'AM' | 'PM';
  tono: string;
  recomendacion: string;
  dias: string[];
  repetir: 'nunca' | 'diario' | 'semanal' | 'mensual';
  actividadVinculada: string;
}

@Component({
  selector: 'app-alarm-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ButtonComponent],
  template: `
    <app-modal
      [isOpen]="isOpen"
      [config]="modalConfig"
      (modalClose)="onClose()">
      <div class="alarm-form">
        <!-- Header interno -->
        <div class="modal-header-custom d-flex align-center">
          <h2>{{ mode === 'add' ? 'Agregar Alarma' : 'Editar Alarma' }}</h2>
          <button 
            class="close-button rounded-full d-flex align-center justify-center" 
            (click)="onClose()"
            type="button"
            aria-label="Cerrar">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Nombre -->
        <div class="form-group">
          <label for="nombre">Nombre de la alarma</label>
          <input 
            id="nombre"
            type="text"
            [(ngModel)]="formData.nombre"
            class="form-control"
            placeholder="Ej. Medicación matutina">
        </div>

        <!-- Hora -->
        <div class="form-group">
          <label for="hora">Hora</label>
          <div class="time-input-container">
            <select 
              id="hora" 
              [(ngModel)]="formData.hora" 
              class="form-control time-select">
              @for (time of timeOptions; track time) {
                <option [value]="time">{{ time }}</option>
              }
            </select>
            <select 
              [(ngModel)]="formData.periodo" 
              class="form-control period-select">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <!-- Tono/Sonido -->
        <div class="form-group">
          <label for="tono">Tono/Sonido</label>
          <div class="select-with-icon">
            <select 
              id="tono" 
              [(ngModel)]="formData.tono" 
              class="form-control">
              @for (sound of soundOptions; track sound.value) {
                <option [value]="sound.value">{{ sound.label }}</option>
              }
            </select>
            <i class="bi bi-volume-up select-icon"></i>
          </div>
        </div>

        <!-- Recomendación -->
        <div class="form-group">
          <label for="recomendacion">Recomendación</label>
          <textarea 
            id="recomendacion"
            [(ngModel)]="formData.recomendacion"
            class="form-control textarea"
            placeholder="Escribe una recomendación...">
          </textarea>
        </div>

        <!-- Días -->
        <div class="form-group">
          <label>Días</label>
          <div class="days-container d-flex flex-wrap justify-center">
            @for (day of dayOptions; track day.value) {
              <app-button
                [text]="day.short"
                variant="day"
                size="small"
                [active]="isDaySelected(day.value)"
                (buttonClick)="toggleDay(day.value)"
              ></app-button>
            }
          </div>
        </div>

        <!-- Repetir -->
        <div class="form-group">
          <label for="repetir">Repetir</label>
          <select 
            id="repetir" 
            [(ngModel)]="formData.repetir" 
            class="form-control">
            @for (repeat of repeatOptions; track repeat.value) {
              <option [value]="repeat.value">{{ repeat.label }}</option>
            }
          </select>
        </div>

        <!-- Actividad Vinculada -->
        <div class="form-group">
          <label for="actividad">Actividad Vinculada</label>
          <div class="select-with-icon">
            <select 
              id="actividad" 
              [(ngModel)]="formData.actividadVinculada" 
              class="form-control">
              @for (activity of activityOptions; track activity.value) {
                <option [value]="activity.value">{{ activity.label }}</option>
              }
            </select>
            <i class="bi bi-link-45deg select-icon"></i>
          </div>
        </div>

        <!-- Footer con botones -->
        <div class="modal-footer-custom d-flex">
          <app-button
            text="Cancelar"
            variant="outline"
            size="medium"
            [fullWidth]="true"
            (buttonClick)="onClose()">
          </app-button>
          <app-button
            text="Guardar"
            variant="accent"
            size="medium"
            [fullWidth]="true"
            [disabled]="!isFormValid()"
            (buttonClick)="onSave()">
          </app-button>
        </div>
      </div>
    </app-modal>
  `,
  styleUrl: './alarm-modal.component.css'
})
export class AlarmModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() initialData: Partial<AlarmFormData> | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<AlarmFormData>();

  formData: AlarmFormData = {
    nombre: '',
    hora: '07:30',
    periodo: 'AM',
    tono: 'clasico',
    recomendacion: '',
    dias: [],
    repetir: 'nunca',
    actividadVinculada: 'estiramiento-matutino'
  };

  modalConfig = {
    size: 'medium' as const,
    position: 'center' as const,
    animation: 'fade' as const,
    closeOnBackdropClick: true,
    closeOnEscapeKey: true,
    showCloseButton: false,
    preventBodyScroll: true
  };

  timeOptions = [
    '12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
    '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'
  ];

  soundOptions = [
    { value: 'clasico', label: 'Clásico' },
    { value: 'suave', label: 'Suave' },
    { value: 'energico', label: 'Enérgico' },
    { value: 'naturaleza', label: 'Naturaleza' },
    { value: 'melodico', label: 'Melódico' }
  ];

  dayOptions = [
    { value: 'L', short: 'L', full: 'Lunes' },
    { value: 'M', short: 'M', full: 'Martes' },
    { value: 'X', short: 'X', full: 'Miércoles' },
    { value: 'J', short: 'J', full: 'Jueves' },
    { value: 'V', short: 'V', full: 'Viernes' },
    { value: 'S', short: 'S', full: 'Sábado' },
    { value: 'D', short: 'D', full: 'Domingo' }
  ];

  repeatOptions = [
    { value: 'nunca', label: 'Nunca' },
    { value: 'diario', label: 'Diario' },
    { value: 'semanal', label: 'Semanal' },
    { value: 'mensual', label: 'Mensual' }
  ];

  activityOptions = [
    { value: 'estiramiento-matutino', label: 'Estiramiento Matutino' },
    { value: 'ejercicio-cardio', label: 'Ejercicio Cardio' },
    { value: 'meditacion', label: 'Meditación' },
    { value: 'lectura', label: 'Lectura' },
    { value: 'hidratacion', label: 'Hidratación' },
    { value: 'descanso', label: 'Descanso' }
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mode'] || changes['initialData']) {
      this.updateModalConfig();
      this.resetForm();
    }

    if (changes['initialData'] && this.initialData) {
      this.formData = {
        nombre: this.initialData.nombre || '',
        hora: this.initialData.hora || '07:30',
        periodo: this.initialData.periodo || 'AM',
        tono: this.initialData.tono || 'clasico',
        recomendacion: this.initialData.recomendacion || '',
        dias: this.initialData.dias ? [...this.initialData.dias] : [],
        repetir: this.initialData.repetir || 'nunca',
        actividadVinculada: this.initialData.actividadVinculada || 'estiramiento-matutino'
      };
    }
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    if (this.isFormValid()) {
      this.save.emit({ ...this.formData });
    }
  }

  isDaySelected(day: string): boolean {
    return this.formData.dias.includes(day);
  }

  toggleDay(day: string) {
    const index = this.formData.dias.indexOf(day);
    if (index > -1) {
      this.formData.dias.splice(index, 1);
    } else {
      this.formData.dias.push(day);
    }
  }

  private updateModalConfig() {
    // Modal config is handled via getters, no need to update here
  }

  private resetForm() {
    if (this.mode === 'add') {
      this.formData = {
        nombre: '',
        hora: '07:30',
        periodo: 'AM',
        tono: 'clasico',
        recomendacion: '',
        dias: [],
        repetir: 'nunca',
        actividadVinculada: 'estiramiento-matutino'
      };
    }
  }

  isFormValid(): boolean {
    return this.formData.nombre.trim().length > 0 && this.formData.dias.length > 0;
  }
}