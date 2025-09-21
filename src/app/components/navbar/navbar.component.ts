import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() userName: string = 'Usuario';
  @Input() userAvatar: string = '👤';
  @Input() notificationCount: number = 0;
  @Input() messageCount: number = 0;

  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  navItems = [
    { label: 'Dashboard', active: false, route: '/dashboard' },
    { label: 'Alarmas', active: false, route: '/alarms' },
    { label: 'Actividades', active: false, route: '/activities' },
    { label: 'Mensajes', active: false, route: '/messages' },
    { label: 'Soporte y Ayuda', active: false, route: '/support' }
  ];

  ngOnInit() {
    // Set initial active state based on current route
    this.updateActiveState(this.router.url);

    // Subscribe to router events to update active state
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateActiveState(event.url);
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateActiveState(url: string) {
    // Reset all items to inactive
    this.navItems.forEach(item => item.active = false);
    
    // Find and activate the current route
    const activeItem = this.navItems.find(item => url.startsWith(item.route));
    if (activeItem) {
      activeItem.active = true;
    }
  }

  onNavItemClick(item: any) {
    // Only navigate if route is valid
    if (item.route && item.route !== '#') {
      this.router.navigate([item.route]);
    }
  }
}
