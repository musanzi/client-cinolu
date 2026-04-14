import { LucideIconData, Info, Calendar1, BookOpen, Image } from 'lucide-angular';

export interface ILink {
  name: string;
  translationKey?: string;
  external?: boolean;
  description?: string;
  fragment?: string;
  icon?: LucideIconData;
  path?: string;
  exactUrl?: boolean;
  children?: ILink[];
  open?: boolean;
}

export const PARCOURIR_LINKS: ILink[] = [
  {
    name: 'Accueil',
    translationKey: 'nav.home',
    path: '/'
  },
  {
    name: 'Évènements',
    translationKey: 'nav.events',
    path: '/events'
  },

  {
    name: 'Programmes',
    translationKey: 'nav.programs',
    path: '/programs'
  },
  {
    name: 'Opportunités',
    translationKey: 'nav.opportunities',
    path: '/opportunities'
  }
];

export const MY_CINOLU_LINKS: ILink[] = [
  {
    name: 'A propos',
    translationKey: 'nav.about',
    path: '/about-us'
  },
  {
    name: 'Vision',
    translationKey: 'nav.vision',
    path: '/about-us',
    fragment: 'vision'
  },
  {
    name: 'Contact',
    translationKey: 'nav.contact',
    path: '/contact-us'
  },
  {
    name: 'Blog',
    translationKey: 'nav.blogResources',
    path: '/blog-ressources'
  }
];

export const EXPLORATION_LINKS: ILink[] = [
  {
    icon: Calendar1,
    name: 'Accueil',
    translationKey: 'nav.home',
    path: '/',
    exactUrl: true
  },
  {
    icon: Info,
    name: 'My Cinolu',
    translationKey: 'nav.myCinolu',
    path: '/mycinolu',
    children: [
      { name: 'Nos entrepreneurs', translationKey: 'nav.entrepreneurs', path: '/entrepreneurs', exactUrl: true },
      { name: 'Blog', translationKey: 'nav.blogResources', path: '/blog-ressources', icon: BookOpen },
      { name: 'Galerie', translationKey: 'nav.gallery', path: '/gallery', icon: Image },
      { name: 'À propos', translationKey: 'nav.about', path: '/about-us' },
      { name: 'Contacts', translationKey: 'nav.contact', path: '/contact-us', icon: Image }
    ]
  },
  {
    icon: Calendar1,
    name: 'Évènements',
    translationKey: 'nav.events',
    path: '/events'
  },
  {
    icon: BookOpen,
    name: 'Opportunités',
    translationKey: 'nav.opportunities',
    path: '/opportunities'
  }
];

export const SOCIAL_LINKS: ILink[] = [
  {
    name: 'Facebook',
    path: 'https://www.facebook.com/share/15cR36qNs8/?mibextid=kFxxJD',
    external: true
  },
  {
    name: 'Twitter',
    path: 'https://x.com/Lubumdigital?t=MYcaQ_OEdCO3KZDCQzMoeQ&s=09',
    external: true
  },
  {
    name: 'LinkedIn',
    path: 'https://www.linkedin.com/company/cinolu/',
    external: true
  }
];
