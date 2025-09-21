import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig, ModalAction, ModalHeader, DEFAULT_MODAL_CONFIG } from '../../modal/modal.interface';

@Component({
  selector: 'app-success-modal',
  imports: [CommonModule, ModalComponent],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css'
})
export class SuccessModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '¡Éxito!';
  @Input() message: string = 'La operación se completó correctamente';
  @Input() confirmText: string = 'Aceptar';
  @Input() autoClose: boolean = false;
  @Input() autoCloseDelay: number = 3000;

  @Output() modalClose = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();

  modalConfig: ModalConfig = {
    ...DEFAULT_MODAL_CONFIG,
    size: 'small',
    animation: 'zoom'
  };

  modalHeader: ModalHeader = {
    title: this.title,
    showCloseButton: true
  };

  modalActions: ModalAction[] = [
    {
      label: this.confirmText,
      action: () => this.onConfirm(),
      variant: 'primary'
    }
  ];

  ngOnInit() {
    this.updateModalContent();
    
    if (this.autoClose && this.isOpen) {
      setTimeout(() => {
        this.onClose();
      }, this.autoCloseDelay);
    }
  }

  ngOnChanges() {
    this.updateModalContent();
  }

  private updateModalContent() {
    this.modalHeader = {
      title: this.title,
      showCloseButton: true
    };

    this.modalActions = [
      {
        label: this.confirmText,
        action: () => this.onConfirm(),
        variant: 'primary'
      }
    ];
  }

  onClose() {
    this.modalClose.emit();
  }

  onConfirm() {
    this.confirmAction.emit();
    this.onClose();
  }
}
