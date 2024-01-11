import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainToolbar } from "./layout/header/header.component";
import { FooterComponent } from './layout/footer/footer.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, MainToolbar, FooterComponent ]
})
export class AppComponent {
  title = 'quoteRequest';
}
