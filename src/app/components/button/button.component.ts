import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'turquoise';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  @Output() buttonClick = new EventEmitter<Event>();

  onClick(event: Event) {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }

  get buttonClasses(): string {
    const classes = ['btn'];
    
    classes.push(`btn--${this.variant}`);
    classes.push(`btn--${this.size}`);
    
    if (this.disabled) {
      classes.push('btn--disabled');
    }
    
    if (this.loading) {
      classes.push('btn--loading');
    }
    
    if (this.fullWidth) {
      classes.push('btn--full-width');
    }
    
    return classes.join(' ');
  }
}
