import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-opportunity-card-skeleton',
  templateUrl: './opportunity-card-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpportunityCardSkeleton {}
