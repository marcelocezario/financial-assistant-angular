import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ColorUtils } from '../../utils/color-utils';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss'
})
export class TimelineItemComponent implements OnInit, OnDestroy {

  @Input() eventPosition: 'left' | 'right' = 'right'
  @Input() linePosition: 'left' | 'center' | 'right' = 'left'
  @Input() icons: {icon: string, color: string}[] = []

  priorityEventPosition: 'left' | 'right' = this.eventPosition
  priorityLinePosition: 'left' | 'center' | 'right' = this.linePosition

  private _breakpoinSubscription$: Subscription | undefined;

  constructor(private _breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this._breakpoinSubscription$ = this._breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      if (result.matches) {
        if (this.linePosition == 'center') {
          this.priorityEventPosition = 'right'
          this.priorityLinePosition = 'left'
        }
      } else {
        this.priorityEventPosition = this.eventPosition
        this.priorityLinePosition = this.linePosition
      }
    })
  }

  ngOnDestroy(): void {
    if (this._breakpoinSubscription$) {
      this._breakpoinSubscription$.unsubscribe();
    }
  }

  getContrastingColor(color: string): string {
    return ColorUtils.getContrastingColor(color);
  }

}
