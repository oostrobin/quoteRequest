import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HomeComponent, HttpClientModule],
    providers: [HttpClientModule]
})
export class AppComponent {
  title = 'quoteRequest';
}
