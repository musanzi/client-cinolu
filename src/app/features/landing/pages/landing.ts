import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Partners } from '../components/partners/partners';
import { Networks } from '../components/networks/networks';
import { RecentEvents } from '../components/recent-events/recent-events';
import { RecentProjects } from '../components/recent-projects/recent-projects';
import { WhyJoinUs } from '../components/why-join-us/why-join-us';
import { Programs } from '../components/programs/programs';
import { Sectors } from '../components/sectors/sectors';
import { Onestop } from '../components/onestop/onestop';
import { Services } from '../components/services/services';
import { Hero } from '../components/hero/hero';
// import { TopAmbassadors } from '../components/top-ambassadors/top-ambassadors';

@Component({
  selector: 'app-landing',
  imports: [RecentProjects, RecentEvents, Networks, Partners, WhyJoinUs, Programs, Sectors, Onestop, Services, Hero],
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Landing {}
