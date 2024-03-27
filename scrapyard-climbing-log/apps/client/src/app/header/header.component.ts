import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `<header>
    <div class="logo-container">
      <a routerLink="/" routerLinkActive="active">
        <img
          class="logo"
          src="assets/scrapyard.svg"
          alt="Scrapyard Climbing Log"
        />
      </a>
    </div>
    <h1>
      Scrapyard <br />
      Climbing Log
    </h1>
    @if (loggedIn) {
    <button class="account-button">Logout</button>
    } @else {
    <button class="account-button">Login</button>
    }
  </header> `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  loggedIn = true;
}
