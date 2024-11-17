import {ElementRef, Injectable, Renderer2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageTempGeneratorService {

  constructor() {

  }

  generatePlaceHolderImage(width: number, height: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#ddd';
      context.fillRect(0, 0, width, height);
      // Text color and styling
      context.fillStyle = '#000';
      context.font = '15rem Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText('Loading...', width / 2, height / 2);
    }
    return canvas.toDataURL('image/png');
  }
}
