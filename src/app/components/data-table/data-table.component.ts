import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'badge' | 'actions';
  width?: string;
}

export interface TableAction {
  icon: string;
  label: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  action: string;
}

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading: boolean = false;
  @Input() emptyMessage: string = 'No hay datos disponibles';
  @Input() sortColumn: string = '';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';

  @Output() sort = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();
  @Output() actionClick = new EventEmitter<{ action: string; item: any }>();

  onSort(column: TableColumn) {
    if (!column.sortable) return;

    let direction: 'asc' | 'desc' = 'asc';
    if (this.sortColumn === column.key && this.sortDirection === 'asc') {
      direction = 'desc';
    }

    this.sortColumn = column.key;
    this.sortDirection = direction;
    this.sort.emit({ column: column.key, direction });
  }

  onActionClick(action: TableAction, item: any, event: Event) {
    event.stopPropagation();
    this.actionClick.emit({ action: action.action, item });
  }

  getCellValue(item: any, column: TableColumn): any {
    return item[column.key];
  }

  getStatusBadgeProps(value: any): { status: any; text: string } {
    if (typeof value === 'object' && value.status && value.text) {
      return value;
    }
    
    // Default mapping for simple string values
    const statusMap: Record<string, any> = {
      'activo': 'active',
      'inactivo': 'inactive',
      'pendiente': 'pending',
      'completado': 'success',
      'error': 'error'
    };

    return {
      status: statusMap[value?.toLowerCase()] || 'inactive',
      text: value
    };
  }
}
