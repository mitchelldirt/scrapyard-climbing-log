import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
}
