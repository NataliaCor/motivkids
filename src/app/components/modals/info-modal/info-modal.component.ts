import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig, ModalAction, ModalHeader, DEFAULT_MODAL_CONFIG } from '../../modal/modal.interface';

@Component({
  selector: 'app-info-modal',
  imports: [CommonModule, ModalComponent],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.css'
})
export class InfoModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Información';
  @Input() message: string = '';
  @Input() content?: string; // HTML content
  @Input() icon?: string; // Icon class or SVG
  @Input() confirmText: string = 'Entendido';
  @Input() showIcon: boolean = true;

  @Output() modalClose = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();

  modalConfig: ModalConfig = {
    ...DEFAULT_MODAL_CONFIG,
    size: 'medium',
    animation: 'fade'
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
  }

  onClose() {
    this.modalClose.emit();
  }

  onConfirm() {
    this.confirmAction.emit();
    this.onClose();
  }

  getDefaultIcon(): string {
    return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="var(--color-secondary)"/>
      <path d="M24 16H24.01M24 22V32" stroke="var(--color-black)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }
}
