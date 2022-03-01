import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@frontend/admin/environments';
@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() images: string[];
  selectedImage: string;
  host = environment.host;

  constructor() {}

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImage = this.images[0];
    }
  }

  changeSelectedImage(image: string) {
    this.selectedImage = image;
  }

  get hasImages() {
    return this.images?.length > 0;
  }
}
