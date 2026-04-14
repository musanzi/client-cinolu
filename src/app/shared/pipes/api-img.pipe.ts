import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';

@Pipe({
  name: 'apiIMG',
  pure: true
})
export class ApiImgPipe implements PipeTransform {
  transform(obj: unknown, type: string): string {
    const { apiUrl } = environment;
    const value = obj as Record<string, unknown>;
    switch (type) {
      case 'program':
        return typeof value['logo'] === 'string' && value['logo']
          ? `${apiUrl}uploads/programs/${value['logo']}`
          : '/images/no-image.jpg';
      case 'gallery':
        return typeof value['image'] === 'string' && value['image']
          ? `${apiUrl}uploads/galleries/${value['image']}`
          : '/images/no-image.jpg';
      case 'subprogram':
        return typeof value['logo'] === 'string' && value['logo']
          ? `${apiUrl}uploads/subprograms/${value['logo']}`
          : '/images/no-image.jpg';
      case 'user':
        if (typeof value['profile'] === 'string' && value['profile']) {
          return `${apiUrl}uploads/profiles/${value['profile']}`;
        }
        if (typeof value['google_image'] === 'string' && value['google_image']) {
          return value['google_image'];
        }
        return '/images/no-image.jpg';
      case 'project':
        return typeof value['cover'] === 'string' && value['cover']
          ? `${apiUrl}uploads/projects/${value['cover']}`
          : '/images/no-image.jpg';
      case 'venture':
        return typeof value['logo'] === 'string' && value['logo']
          ? `${apiUrl}uploads/ventures/logos/${value['logo']}`
          : '/images/no-image.jpg';

      case 'ventureCover':
        return typeof value['cover'] === 'string' && value['cover']
          ? `${apiUrl}uploads/ventures/covers/${value['cover']}`
          : '/images/no-image.jpg';

      case 'product':
        return typeof value['image'] === 'string' && value['image']
          ? `${apiUrl}uploads/products/images/${value['image']}`
          : '/images/no-image.jpg';

      case 'article':
        return typeof value['image'] === 'string' && value['image']
          ? `${apiUrl}uploads/articles/${value['image']}`
          : '/images/no-image.jpg';

      case 'event':
        return typeof value['cover'] === 'string' && value['cover']
          ? `${apiUrl}uploads/events/${value['cover']}`
          : '/images/no-image.jpg';
      case 'opportunity':
        return typeof value['cover'] === 'string' && value['cover']
          ? `${apiUrl}uploads/opportunities/${value['cover']}`
          : '/images/no-image.jpg';
      default:
        return '/images/no-image.jpg';
    }
  }
}
