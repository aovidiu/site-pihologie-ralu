import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReadMoreComponent } from '../app/read-more/read-more';
import { ContactEmail } from '../app/contact-email/contact-email';

interface Block {
    id: number;
    desktop: number;
    mobile: number;
}

@Component({
selector: 'app-main-page',
  imports: [ContactEmail, ReadMoreComponent, CommonModule, FormsModule],
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css']})

export class MainPageComponent {

currentLayout: 'desktop' | 'mobile' = 'desktop';

blocks: Block[] = [
    { id: 1, desktop: 1, mobile: 1 },
    { id: 2, desktop: 2, mobile: 4 },
    { id: 3, desktop: 3, mobile: 5 },
    { id: 4, desktop: 4, mobile: 8 },
    { id: 5, desktop: 5, mobile: 9 },
    { id: 6, desktop: 6, mobile: 2 },
    { id: 7, desktop: 7, mobile: 3 },
    { id: 8, desktop: 8, mobile: 6 },
    { id: 9, desktop: 9, mobile: 7 }
];

orderedBlocks: Block[] = [];

constructor() {
    this.recalculateLayout();
}

@HostListener('window:resize')
    onResize() {
    this.recalculateLayout();
}

showReadMore = false;

openReadMore() {
  this.showReadMore = true;
}

closeReadMore() {
  this.showReadMore = false;
}

recalculateLayout() {
    const layout = window.innerWidth <= 1199 ? 'mobile' : 'desktop';

    if (layout !== this.currentLayout) {
        this.currentLayout = layout;
    }

    this.orderedBlocks = [...this.blocks].sort((a, b) =>
        layout === 'mobile'
        ? a.mobile - b.mobile
        : a.desktop - b.desktop
    );
}
}