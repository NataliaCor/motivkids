import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class NavbarComponent {
  @Input() userName: string = 'Usuario';
  @Input() userAvatar: string = '👤';
  @Input() notificationCount: number = 0;
  @Input() messageCount: number = 0;

  constructor(private router: Router) {}

  navItems = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Alarmas', route: '/alarms' },
    { label: 'Actividades', route: '/activities' },
    { label: 'Mensajes', route: '/messages' },
    { label: 'Soporte y Ayuda', route: '/support' }
  ];

  onNavItemClick(item: any) {
    // Only navigate if route is valid
    if (item.route && item.route !== '#') {
      this.router.navigate([item.route]);
    }
  }
}
