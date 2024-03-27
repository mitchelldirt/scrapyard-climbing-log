import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <a href="/">Return to home page</a>
    </main>
  `,
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {}
