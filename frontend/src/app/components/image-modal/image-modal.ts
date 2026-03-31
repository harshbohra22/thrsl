import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-modal.html',
  styleUrl: './image-modal.scss'
})
export class ImageModalComponent {
  @Input() imageUrl: string = '';
  @Input() altText: string = 'Full size image';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
