import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css',
})
export class RouteComponent {
  sampleRoute = {
    id: '12345',
    grade: 'V0',
    image:
      'https://images.pexels.com/photos/5383514/pexels-photo-5383514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '03/25/2024',
    sent: true,
    attempts: 3,
    notes: 'This is a sample route.',
    likes: 4,
  };
}
