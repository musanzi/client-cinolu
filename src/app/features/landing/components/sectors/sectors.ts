import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { LucideAngularModule, LucideIconData, Pickaxe, Sprout, Users } from 'lucide-angular';

interface Sector {
  id: string;
  name: string;
  description: string;
  icon: LucideIconData;
  image: string;
  tag: string;
  programs: number;
  participants: number;
}

@Component({
  selector: 'app-sectors',
  imports: [LucideAngularModule],
  templateUrl: './sectors.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sectors implements OnInit {
  sectors = signal<Sector[]>([
    {
      id: 'mintech',
      name: 'MinTech',
      description:
        "Innovation et solutions technologiques pour transformer le secteur minier. De l'extraction à la gestion, nous accompagnons les projets tech pour une industrie minière durable et moderne.",
      icon: Pickaxe,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      tag: 'Technologie Minière',
      programs: 8,
      participants: 250
    },
    {
      id: 'greentech',
      name: 'GreenTech & AgriTech',
      description:
        "Solutions durables pour l'environnement et l'agriculture. Nous soutenons les innovations qui répondent aux défis climatiques et alimentaires tout en créant de la valeur économique.",
      icon: Sprout,
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop',
      tag: 'Innovation Verte',
      programs: 12,
      participants: 480
    },
    {
      id: 'gender-inclusion',
      name: 'Gender Inclusion',
      description:
        'Inclusion, égalité et autonomisation économique des femmes. Programmes dédiés pour réduire les barrières et créer des opportunités entrepreneuriales équitables dans tous les secteurs.',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      tag: 'Égalité & Inclusion',
      programs: 15,
      participants: 620
    }
  ]);

  ngOnInit(): void {
    this.observeCards();
  }

  private observeCards(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    setTimeout(() => {
      const cards = document.querySelectorAll('.sector-card');
      cards.forEach((card) => observer.observe(card));
    }, 100);
  }

  trackBySectorId(_index: number, sector: Sector): string {
    return sector.id;
  }
}
