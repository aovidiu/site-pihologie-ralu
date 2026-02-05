import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('psihologie-ralu');
}
