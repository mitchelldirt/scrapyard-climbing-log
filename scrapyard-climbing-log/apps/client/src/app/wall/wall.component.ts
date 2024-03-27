import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-wall',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.css',
})
export class WallComponent {
  sampleRoutes = [
    { id: '12345', sent: true, grade: 'V0', attempts: 3 },
    { id: '12345', sent: false, grade: 'V1', attempts: 2 },
    { id: '12345', sent: true, grade: 'V2', attempts: 1 },
    { id: '12345', sent: false, grade: 'V3', attempts: 4 },
    { id: '12345', sent: true, grade: 'V4', attempts: 2 },
    { id: '12345', sent: false, grade: 'V5', attempts: 3 },
    { id: '12345', sent: true, grade: 'V6', attempts: 1 },
    { id: '12345', sent: false, grade: 'V7', attempts: 2 },
    { id: '12345', sent: true, grade: 'V8', attempts: 1 },
    { id: '12345', sent: false, grade: 'V9', attempts: 3 },
    { id: '12345', sent: true, grade: 'V?', attempts: 1000 },
  ];
}
