import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig, ModalAction, ModalHeader, DEFAULT_MODAL_CONFIG } from '../../modal/modal.interface';

@Component({
  selector: 'app-form-modal',
  imports: [CommonModule, ModalComponent],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Formulario';
  @Input() submitText: string = 'Guardar';
  @Input() cancelText: string = 'Cancelar';
  @Input() isSubmitting: boolean = false;
  @Input() isValid: boolean = true;
  @Input() showFooter: boolean = true;

  @Output() modalClose = new EventEmitter<void>();
  @Output() submitAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();

  modalConfig: ModalConfig = {
    ...DEFAULT_MODAL_CONFIG,
    size: 'medium',
    animation: 'slide-down',
    closeOnBackdropClick: false
  };

  modalHeader: ModalHeader = {
    title: this.title,
    showCloseButton: true
  };

  modalActions: ModalAction[] = [];

  ngOnInit() {
    this.updateModalContent();
  }

  ngOnChanges() {
    this.updateModalContent();
  }

  private updateModalContent() {
    this.modalHeader = {
      title: this.title,
      showCloseButton: true
    };

    if (this.showFooter) {
      this.modalActions = [
        {
          label: this.cancelText,
          action: () => this.onCancel(),
          variant: 'outline',
          disabled: this.isSubmitting
        },
        {
          label: this.isSubmitting ? 'Guardando...' : this.submitText,
          action: () => this.onSubmit(),
          variant: 'primary',
          disabled: !this.isValid || this.isSubmitting,
          loading: this.isSubmitting
        }
      ];
    } else {
      this.modalActions = [];
    }
  }

  onSubmit() {
    if (this.isValid && !this.isSubmitting) {
      this.submitAction.emit();
    }
  }

  onCancel() {
    if (!this.isSubmitting) {
      this.cancelAction.emit();
      this.onClose();
    }
  }

  onClose() {
    if (!this.isSubmitting) {
      this.modalClose.emit();
    }
  }
}
