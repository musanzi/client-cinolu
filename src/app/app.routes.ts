import { Route } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { Layout } from './layout/layout';

export const routes: Route[] = [
  {
    path: 'programs',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/projects/projects.routes').then((m) => m.projectsRoutes)
  },
  {
    path: 'partners',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/partners/partners.routes').then((m) => m.partnersRoutes)
  },
  {
    path: 'our-programs',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/programs/programs.routes').then((m) => m.programsRoutes)
  },
  {
    path: 'events',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/events/events.routes').then((m) => m.eventsRoutes)
  },
  {
    path: 'opportunities',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/opportunities/opportunities.routes').then((m) => m.opportunitiesRoutes)
  },
  {
    path: 'ambassadors',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/ambassadors/ambassadors.routes').then((m) => m.ambassadorsRoutes)
  },

  {
    path: 'about-us',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/about-us/about-us.routes').then((m) => m.aboutRoutes)
  },
  {
    path: 'entrepreneurs',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/entrepreneurs/entrepreneurs.routes').then((m) => m.entrepreneursRoutes)
  },
  {
    path: 'entrepreneurs/:id',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/entrepreneurs/entrepreneurs.routes').then((m) => m.entrepreneursRoutes)
  },
  {
    path: 'gallery',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/gallery/gallery.routes').then((m) => m.galleryRoutes)
  },
  {
    path: 'contact-us',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/contact-us/contact-us.routes').then((m) => m.contactUsRoutes)
  },
  {
    path: 'faq',
    component: Layout,
    data: { layout: 'fixed-layout' },
    loadChildren: () => import('./features/faq/faq.routes').then((m) => m.faqRoutes)
  },

  {
    path: 'blog-ressources',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/blog/blogs.routes').then((m) => m.blogsRoutes)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes)
  },
  {
    path: '',
    component: Layout,
    data: { layout: 'full-layout' },
    loadChildren: () => import('./features/landing/landing.routes').then((m) => m.landingRoutes)
  },
  {
    path: '',
    component: Layout,
    data: { layout: 'empty-layout' },
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes)
  },
  {
    path: '**',
    component: Layout,
    data: { layout: 'empty-layout' },
    children: [
      {
        path: '',
        loadComponent: () => import('./features/not-found/not-found').then((c) => c.NotFoundPage)
      }
    ]
  }
];
