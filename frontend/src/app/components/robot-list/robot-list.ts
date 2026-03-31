import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CatalogService } from '../../services/catalog';
import { Robot, Category } from '../../models/catalog.models';
import { ImageModalComponent } from '../image-modal/image-modal';

@Component({
  selector: 'app-robot-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageModalComponent],
  templateUrl: './robot-list.html',
  styleUrl: './robot-list.scss'
})
export class RobotListComponent implements OnInit {
  robots: Robot[] = [];
  category: Category | undefined;
  categoryId: string = '';
  selectedImage: string | null = null;
  selectedAltText: string = '';

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId') || '';
    this.category = this.catalogService.getCategoryById(this.categoryId);
    this.robots = this.catalogService.getRobotsByCategory(this.categoryId);
  }

  getStatusClass(status: string): string {
    return `status--${status}`;
  }

  openModal(url: string, name: string): void {
    this.selectedImage = url;
    this.selectedAltText = name;
  }

  closeModal(): void {
    this.selectedImage = null;
  }
}
