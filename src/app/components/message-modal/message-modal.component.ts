import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';

export interface MessageFormData {
  message: string;
  recipientType?: string;
}

@Component({
  selector: 'app-message-modal',
  imports: [CommonModule, FormsModule, ModalComponent, ButtonComponent],
  template: `
    <app-modal
      [isOpen]="isOpen"
      [config]="modalConfig"
      (modalClose)="onClose()">
      
      <div class="message-form">
        <!-- Header interno -->
        <div class="modal-header-custom">
          <h2>{{ mode === 'add' ? 'Agregar Mensaje' : 'Editar Mensaje' }}</h2>
          <button 
            class="close-button" 
            (click)="onClose()"
            type="button"
            aria-label="Cerrar">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <div class="form-group">
          <label for="message-input" class="form-label">Mensaje</label>
          <textarea
            id="message-input"
            class="form-textarea"
            placeholder="Escribe tu mensaje aquí..."
            [(ngModel)]="formData.message"
            rows="6"
            maxlength="500">
          </textarea>
          <div class="char-count">
            {{ formData.message.length }}/500
          </div>
        </div>

        <!-- Footer con botones -->
        <div class="modal-footer-custom">
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
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() initialData?: MessageFormData;
  
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<MessageFormData>();

  formData: MessageFormData = {
    message: ''
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

  ngOnInit() {
    if (this.initialData) {
      this.formData = { ...this.initialData };
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

  isFormValid(): boolean {
    return this.formData.message.trim().length > 0;
  }
}