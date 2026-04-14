import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, CalendarDays, ExternalLink, Globe2, Link2 } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { QuillViewComponent } from 'ngx-quill';
import { OpportunityStore } from '../../store/opportunity.store';
import { ApiImgPipe } from '../../../../shared/pipes';
import { ButtonComponent, BadgeComponent } from '../../../../shared/ui';
import { AnalyticsService } from '../../../../core/services/analytics/analytics.service';

@Component({
  selector: 'app-detail-opportunity',
  providers: [OpportunityStore],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    DatePipe,
    LucideAngularModule,
    TranslateModule,
    QuillViewComponent,
    ApiImgPipe,
    ButtonComponent,
    BadgeComponent
  ],
  templateUrl: './detail-opportunity.html',
  styleUrl: '../../../../shared/styles/quill-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailOpportunity {
  #route = inject(ActivatedRoute);
  #analytics = inject(AnalyticsService);

  protected readonly store = inject(OpportunityStore);
  protected readonly icons = {
    back: ArrowLeft,
    calendar: CalendarDays,
    globe: Globe2,
    external: ExternalLink,
    link: Link2
  };

  constructor() {
    const slug = this.#route.snapshot.params['slug'];
    if (slug) {
      this.store.load(slug);
    }

    effect(() => {
      const opportunity = this.store.opportunity();
      if (opportunity) {
        this.#analytics.trackPageView(`/opportunities/${opportunity.slug}`, opportunity.title);
      }
    });
  }

  protected onExternalLinkClick(url: string): void {
    this.#analytics.trackOutboundLink(url);
  }

  protected isOpportunityExpired(dueDate?: string | Date | null): boolean {
    if (!dueDate) {
      return false;
    }

    return new Date(dueDate).getTime() < Date.now();
  }
}
