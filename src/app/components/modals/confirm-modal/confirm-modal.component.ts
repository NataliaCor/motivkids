import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig, ModalAction, ModalHeader, DEFAULT_MODAL_CONFIG } from '../../modal/modal.interface';

export type ConfirmType = 'warning' | 'danger' | 'info' | 'question';

@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule, ModalComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Confirmar acción';
  @Input() message: string = '¿Estás seguro de que quieres continuar?';
  @Input() type: ConfirmType = 'question';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() isDangerous: boolean = false;

  @Output() modalClose = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();

  modalConfig: ModalConfig = {
    ...DEFAULT_MODAL_CONFIG,
    size: 'small',
    animation: 'fade',
    closeOnBackdropClick: false
  };

  modalHeader: ModalHeader = {
    title: this.title,
    showCloseButton: false
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
      showCloseButton: false
    };

    this.modalActions = [
      {
        label: this.cancelText,
        action: () => this.onCancel(),
        variant: 'outline'
      },
      {
        label: this.confirmText,
        action: () => this.onConfirm(),
        variant: this.isDangerous ? 'accent' : 'primary'
      }
    ];
  }

  onConfirm() {
    this.confirmAction.emit();
    this.onClose();
  }

  onCancel() {
    this.cancelAction.emit();
    this.onClose();
  }

  onClose() {
    this.modalClose.emit();
  }

  getIconSvg(): string {
    switch (this.type) {
      case 'warning':
        return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#F59E0B"/>
          <path d="M24 16V26M24 32H24.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
      case 'danger':
        return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#DC2626"/>
          <path d="M18 18L30 30M30 18L18 30" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
      case 'info':
        return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="#3B82F6"/>
          <path d="M24 16H24.01M24 22V32" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
      case 'question':
      default:
        return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="24" fill="var(--color-secondary)"/>
          <path d="M18 18.5C18 16.5 20 14 24 14S30 16.5 30 18.5C30 20.5 28 21.5 24 22.5V26M24 32H24.01" stroke="var(--color-black)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    }
  }

  getIconColor(): string {
    switch (this.type) {
      case 'warning':
        return '#F59E0B';
      case 'danger':
        return '#DC2626';
      case 'info':
        return '#3B82F6';
      case 'question':
      default:
        return 'var(--color-secondary)';
    }
  }
}
