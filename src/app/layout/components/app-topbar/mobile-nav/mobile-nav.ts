import { Component, input, signal, computed, inject } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ILink } from '../../../data/links.data';
import { ApiImgPipe } from '@shared/pipes';
import { AuthStore } from '@core/auth/auth.store';
import { IProgram } from '@shared/models';
import { LanguageSwitcherComponent } from '../../language-switcher/language-switcher';
import { TOPBAR_ICONS, TOPBAR_ANIMATION } from '../topbar.config';
import { LanguageService } from '@core/services/language/language.service';

@Component({
  selector: 'app-mobile-nav',
  imports: [
    RouterModule,
    NgOptimizedImage,
    LucideAngularModule,
    ApiImgPipe,
    LanguageSwitcherComponent,
    TranslateModule,
    NgClass
  ],
  templateUrl: './mobile-nav.html'
})
export class MobileNav {
  // Services
  private languageService = inject(LanguageService);

  links = input.required<ILink[]>();
  programs = input.required<IProgram[]>();
  onestopUrl = input.required<string>();
  authStore = input.required<InstanceType<typeof AuthStore>>();

  isOpen = signal<boolean>(false);
  programsOpen = signal<boolean>(false);
  openLinkIndex = signal<number | null>(null);

  icons = TOPBAR_ICONS;
  animation = TOPBAR_ANIMATION;

  user = computed(() => this.authStore().user());

  // Helper computed pour traduire les champs selon la langue active (remplace pipe impure)
  translateField = computed(() => {
    const currentLang = this.languageService.currentLanguage();
    return (value: string | null | undefined, fieldName: string, obj: unknown): string => {
      if (!value) return '';
      if (currentLang === 'fr') return value;
      if (obj && fieldName && typeof obj === 'object') {
        const translatedField = `${fieldName}_${currentLang}`;
        const translatedValue = (obj as Record<string, unknown>)[translatedField];
        return (translatedValue as string) || value;
      }
      return value;
    };
  });

  toggleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  closeNav(): void {
    this.isOpen.set(false);
    this.openLinkIndex.set(null);
    this.programsOpen.set(false);
  }

  onSignOut(): void {
    this.authStore().signOut();
  }

  toggleLink(index: number): void {
    this.openLinkIndex.update((current) => (current === index ? null : index));
  }

  isLinkOpen(index: number): boolean {
    return this.openLinkIndex() === index;
  }

  togglePrograms(): void {
    this.programsOpen.update((v) => !v);
  }
}
