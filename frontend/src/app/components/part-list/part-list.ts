import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../../services/catalog';
import { Part, Robot } from '../../models/catalog.models';
import { ImageModalComponent } from '../image-modal/image-modal';

@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageModalComponent],
  templateUrl: './part-list.html',
  styleUrl: './part-list.scss'
})
export class PartListComponent implements OnInit {
  parts: Part[] = [];
  robot: Robot | undefined;
  selectedImage: string | null = null;
  selectedAltText: string = '';

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    const robotId = this.route.snapshot.paramMap.get('robotId') || '';
    this.robot = this.catalogService.getRobotById(robotId);
    this.parts = this.catalogService.getPartsByRobot(robotId);
  }

  getAvailabilityClass(availability: string): string {
    return `avail--${availability}`;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }

  openModal(url: string, name: string): void {
    this.selectedImage = url;
    this.selectedAltText = name;
  }

  closeModal(): void {
    this.selectedImage = null;
  }
}
