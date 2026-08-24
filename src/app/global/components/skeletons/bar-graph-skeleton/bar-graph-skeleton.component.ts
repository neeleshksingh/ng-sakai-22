import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-bar-graph-skeleton',
  standalone: true,
  imports: [SkeletonModule, CommonModule],
  templateUrl: './bar-graph-skeleton.component.html',
  styleUrl: './bar-graph-skeleton.component.scss',
  styles: `
      .bar-skeleton {
        width: 7rem;
      }
  `
})
export class BarGraphSkeletonComponent implements OnInit {

  @Input() data: any;

  ngOnInit(): void {
  }
}