import {ElementRef, Injectable, Renderer2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageTempGeneratorService {
  private cache = new Map<string, string>();
  constructor() {

  }

  generatePlaceHolderImage(width: number, height: number): string {
    const key = `${width}x${height}`; // Unique key for the dimensions

    // Check if the image is already in the cache
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }
    const canvas = document.createElement('canvas');
    canvas.width = width/3;
    canvas.height = height/3;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#ddd';
      context.fillRect(0, 0, width, height);
      // Text color and styling
      context.fillStyle = '#000';
      context.font = '5rem Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('Loading...', canvas.width / 2, canvas.height / 2);
    }

    const previewImage = canvas.toDataURL('image/png');
    this.cache.set(key, previewImage);
    return previewImage;
  }
}
