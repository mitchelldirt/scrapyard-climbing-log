import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, fromEvent, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';

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
  </header>`,
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userId = '';

  constructor(public auth: AuthService, private http: HttpClient) {
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

    // subscribe to authorization changes
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth.idTokenClaims$.subscribe((claims) => {
          console.log(claims);
        });
      }
    });
  }

  toggleDropdown() {
    const dropdown = document.querySelector('.actions-dropdown');
    dropdown?.classList.toggle('show');
  }

  ngOnInit() {
    this.auth.user$
      .pipe(
        switchMap((user) => {
          this.userId = user?.sub ?? '';
          return this.auth.getAccessTokenSilently();
        }),
        switchMap((token) => {
          return ajax({
            url: `https://dev-w15ewae8dmum4hfo.us.auth0.com/api/v2/users/${this.userId}/roles`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
