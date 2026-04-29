import { Routes } from '@angular/router';

export const opportunitiesRoutes: Routes = [
  {
    path: '',
    title: 'Opportunities',
    loadComponent: () => import('./pages/list-opportunities/list-opportunities').then((c) => c.ListOpportunities)
  },
  {
    path: ':slug',
    title: 'Opportunity Details',
    data: { topbarFixed: true },
    loadComponent: () => import('./pages/detail-opportunity/detail-opportunity').then((c) => c.DetailOpportunity)
  }
];
