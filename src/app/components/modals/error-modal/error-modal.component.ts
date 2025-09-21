import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig, ModalAction, ModalHeader, DEFAULT_MODAL_CONFIG } from '../../modal/modal.interface';

@Component({
  selector: 'app-error-modal',
  imports: [CommonModule, ModalComponent],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Error';
  @Input() message: string = 'Ha ocurrido un error inesperado';
  @Input() details?: string;
  @Input() confirmText: string = 'Entendido';
  @Input() showRetryButton: boolean = false;
  @Input() retryText: string = 'Reintentar';

  @Output() modalClose = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();
  @Output() retryAction = new EventEmitter<void>();

  showDetails: boolean = false;

  modalConfig: ModalConfig = {
    ...DEFAULT_MODAL_CONFIG,
    size: 'medium',
    animation: 'slide-down'
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

    this.modalActions = [
      {
        label: this.confirmText,
        action: () => this.onConfirm(),
        variant: 'primary'
      }
    ];

    if (this.showRetryButton) {
      this.modalActions.unshift({
        label: this.retryText,
        action: () => this.onRetry(),
        variant: 'accent'
      });
    }
  }

  onClose() {
    this.modalClose.emit();
  }

  onConfirm() {
    this.confirmAction.emit();
    this.onClose();
  }

  onRetry() {
    this.retryAction.emit();
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
