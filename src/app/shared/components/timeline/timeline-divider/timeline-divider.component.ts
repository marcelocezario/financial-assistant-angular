import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-timeline-divider',
  standalone: true,
  imports: [MatDividerModule, CommonModule],
  templateUrl: './timeline-divider.component.html',
  styleUrl: './timeline-divider.component.scss'
})
export class TimelineDividerComponent {

  @Input({ required: true }) date!: Date;

}
