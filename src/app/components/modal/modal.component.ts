import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfig, ModalAction, ModalHeader, DEFAULT_MODAL_CONFIG } from './modal.interface';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() config: ModalConfig = DEFAULT_MODAL_CONFIG;
  @Input() header?: ModalHeader;
  @Input() actions?: ModalAction[];
  @Input() customClass?: string;

  @Output() modalClose = new EventEmitter<any>();
  @Output() backdropClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<{action: ModalAction, index: number}>();

  @ViewChild('modalContainer', { static: false }) modalContainer!: ElementRef;

  private originalBodyOverflow: string = '';
  isAnimating: boolean = false;

  ngOnInit() {
    // Merge default config with provided config
    this.config = { ...DEFAULT_MODAL_CONFIG, ...this.config };
    
    if (this.isOpen) {
      this.openModal();
    }
  }

  ngOnDestroy() {
    this.restoreBodyScroll();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.config.closeOnEscapeKey && this.isOpen) {
      this.closeModal();
    }
  }

  openModal() {
    this.isAnimating = true;
    this.isOpen = true;
    
    if (this.config.preventBodyScroll) {
      this.preventBodyScroll();
    }

    // Add slight delay for animation
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  closeModal(result?: any) {
    this.isAnimating = true;
    
    setTimeout(() => {
      this.isOpen = false;
      this.isAnimating = false;
      this.restoreBodyScroll();
      this.modalClose.emit(result);
    }, 300);
  }

  onBackdropClick(event: Event) {
    if (this.config.closeOnBackdropClick && event.target === event.currentTarget) {
      // Solo cerrar si el click fue directamente en el backdrop, no en elementos hijos
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal-backdrop')) {
        event.preventDefault();
        event.stopPropagation();
        this.backdropClick.emit();
        this.closeModal();
      }
    }
  }

  onActionClick(action: ModalAction, index: number) {
    if (!action.disabled && !action.loading) {
      this.actionClick.emit({ action, index });
      action.action();
    }
  }

  private preventBodyScroll() {
    this.originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  private restoreBodyScroll() {
    if (this.originalBodyOverflow !== undefined) {
      document.body.style.overflow = this.originalBodyOverflow;
    }
  }

  get modalClasses(): string {
    const classes = ['modal'];
    
    if (this.config.size) {
      classes.push(`modal--${this.config.size}`);
    }
    
    if (this.config.position) {
      classes.push(`modal--${this.config.position}`);
    }
    
    if (this.config.animation) {
      classes.push(`modal--${this.config.animation}`);
    }
    
    if (this.isAnimating) {
      classes.push('modal--animating');
    }
    
    if (this.customClass) {
      classes.push(this.customClass);
    }
    
    return classes.join(' ');
  }
}
