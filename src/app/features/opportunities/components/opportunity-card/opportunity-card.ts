import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, CalendarDays, Languages, ExternalLink } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ApiImgPipe } from '../../../../shared/pipes';
import { IOpportunity } from '../../../../shared/models';
import { BadgeComponent } from '../../../../shared/ui';

@Component({
  selector: 'app-opportunity-card',
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    LucideAngularModule,
    TranslateModule,
    ApiImgPipe,
    DatePipe,
    BadgeComponent
  ],
  templateUrl: './opportunity-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpportunityCard {
  readonly opportunity = input.required<IOpportunity>();
  protected readonly icons = {
    arrowRight: ArrowRight,
    calendar: CalendarDays,
    languages: Languages,
    external: ExternalLink
  };

  protected readonly isExpired = computed(() => {
    const dueDate = this.opportunity().due_date ? new Date(this.opportunity().due_date).getTime() : 0;
    return dueDate > 0 && dueDate < Date.now();
  });
}
