import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'main-toolbar',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDividerModule, MatProgressBarModule], 
})
export class MainToolbar {}
