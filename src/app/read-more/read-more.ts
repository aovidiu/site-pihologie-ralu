import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-read-more',
  imports: [],
  templateUrl: './read-more.html',
  styleUrl: './read-more.css',
})

export class ReadMoreComponent {
  @Output() 
  close = new EventEmitter<void>();
  

  onClose() {
    this.close.emit();
  }
}
