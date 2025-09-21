import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search.emit(this.value);
    }
  }

  onClear() {
    this.value = '';
    this.valueChange.emit(this.value);
    this.clear.emit();
  }

  get hasValue(): boolean {
    return this.value.length > 0;
  }
}
