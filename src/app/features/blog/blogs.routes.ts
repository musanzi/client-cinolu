import { Routes } from '@angular/router';

export const blogsRoutes: Routes = [
  {
    path: '',
    title: 'Blog',
    loadComponent: () => import('./pages/list-articles/list-articles').then((c) => c.ListArticles)
  },
  {
    path: ':slug',
    title: 'Article - Details',
    data: { topbarFixed: true },
    loadComponent: () => import('./pages/detail-article/detail-article').then((c) => c.DetailArticle)
  }
];
