import { Component } from '@angular/core';
import { FormContainerComponent } from './form-container/form-container.component';
import { Subject, takeUntil } from 'rxjs';
import { FormStateService } from '../../shared/services/form-state/form-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormContainerComponent, MatIconModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  currentStep: number = 0;
  private destroy$ = new Subject<void>();

  constructor(private formStateService: FormStateService) {}

  ngOnInit() {
    this.subscribeToFormState();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToFormState() {
    this.formStateService
      .onCurrentStepChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((step) => (this.currentStep = step));
  }


  public goToPreviousStep() {
    this.formStateService.getSharedForm().removeControl('ownership');
    this.formStateService.regressStep();
  }

  public get currentStepTitle(): string {
    const titles: { [key: number]: string } = {
      1: 'Vul je adres in',
      2: 'Bevestig je adres',
      3: 'Op dit adres wil je zonnepanelen',
      4: 'Vul je energieverbruik in',
      5: 'Verwachte opbrengst zonnepanelen',
      6: 'Wat voor dakbedekking heb je?',
      7: 'Wat is de afstand van de grond tot de dakgoot?',
      8: 'Is er een dakkapel aanwezig?',
      9: 'Betreft het een nieuwe aanvraag of een bijplaatsing?',
      10: 'Heeft je dak asbest?',
      11: 'Persoonlijke gegevens',
      12: 'Aanvraag versturen',
      13: 'Bedankt voor je aanvraag!',
    };
    return titles[this.currentStep] || 'Unknown Step';
  }
}
