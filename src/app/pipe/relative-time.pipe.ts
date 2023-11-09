import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: string): string {
    const currentDate = new Date();
    const inputDate = new Date(value);

    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const minutes = Math.floor(timeDifference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years + (years === 1 ? ' year ago' : ' years ago');
    } else if (months > 0) {
      return months + (months === 1 ? ' month ago' : ' months ago');
    } else if (days > 0) {
      return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (hours > 0) {
      return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (minutes > 0) {
      return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else {
      return 'Just now';
    }
  }
}
