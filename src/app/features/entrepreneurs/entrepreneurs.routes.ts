export const entrepreneursRoutes = [
  {
    path: '',
    title: 'Entrepreneurs',
    loadComponent: () => import('./pages/our-entrepreneurs').then((c) => c.OurEntrepreneurs)
  },
  {
    path: ':slug',
    title: 'Entrepreneur - Details',
    data: { topbarFixed: true },
    loadComponent: () =>
      import('./components/entrepreneur-detail-card/entrepreneur-detail-card').then((c) => c.EntrepreneurDetailCard)
  },
  {
    path: 'venture/:slug/:slug',
    title: 'Product - Details',
    data: { topbarFixed: true },
    loadComponent: () => import('./components/product-detail/product-detail').then((c) => c.ProductDetail)
  }
];
