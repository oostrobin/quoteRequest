
import { Component } from '@angular/core';
import { FullScreenFormContainerComponent } from '../../full-screen-form-container/full-screen-form-container.component';
import { DynamicFormComponent } from '../../../dynamic-forms/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FullScreenFormContainerComponent, DynamicFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
