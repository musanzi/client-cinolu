import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ArticleLikesService {
  private readonly storageKey = 'cinolu_blog_article_likes';

  isLiked(articleId: string): boolean {
    return this.readLikedArticleIds().includes(articleId);
  }

  toggleLike(articleId: string): boolean {
    const likedArticleIds = this.readLikedArticleIds();
    const isAlreadyLiked = likedArticleIds.includes(articleId);

    const nextLikedArticleIds = isAlreadyLiked
      ? likedArticleIds.filter((likedId) => likedId !== articleId)
      : [...likedArticleIds, articleId];

    this.writeLikedArticleIds(nextLikedArticleIds);

    return !isAlreadyLiked;
  }

  private readLikedArticleIds(): string[] {
    if (typeof window === 'undefined') {
      return [];
    }

    const rawValue = window.localStorage.getItem(this.storageKey);

    if (!rawValue) {
      return [];
    }

    try {
      const parsedValue = JSON.parse(rawValue);
      return Array.isArray(parsedValue) ? parsedValue.filter((value): value is string => typeof value === 'string') : [];
    } catch {
      return [];
    }
  }

  private writeLikedArticleIds(articleIds: string[]): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(articleIds));
  }
}
