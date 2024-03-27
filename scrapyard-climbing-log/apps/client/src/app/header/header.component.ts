import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, fromEvent } from 'rxjs';

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
    <button
      (click)="toggleDropdown()"
      role="navigation"
      aria-label="Toggle navigation"
    >
      <div class="actions-container">
        <img class="profile-icon" src="assets/profile.svg" alt="profile icon" />
        <ul class="actions-dropdown">
          <li>
            <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
              <button (click)="auth.logout()">Log out</button>
            </ng-container>

            <ng-template #loggedOut>
              <button (click)="auth.loginWithRedirect()">Log in</button>
            </ng-template>
          </li>
        </ul>
      </div>
    </button>
  </header> `,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public auth: AuthService) {
    // use rxjs to subscribe to the click event on the document and close the dropdown if it is open
    fromEvent(document, 'click').subscribe((event: Event) => {
      const dropdown = document.querySelector('.actions-dropdown');
      const target = event.target as HTMLElement;

      if (
        dropdown &&
        dropdown.classList.contains('show') &&
        !dropdown.contains(target) &&
        !target.closest('.actions-container')
      ) {
        this.toggleDropdown();
      }
    });
  }

  toggleDropdown() {
    const dropdown = document.querySelector('.actions-dropdown');
    dropdown?.classList.toggle('show');
  }
}
