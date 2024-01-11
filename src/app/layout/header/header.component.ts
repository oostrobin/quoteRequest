import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HeroComponent } from './hero/hero.component';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'main-toolbar',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatProgressBarModule, HeroComponent], 
})
export class MainToolbar {}
