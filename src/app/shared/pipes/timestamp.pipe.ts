import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value && value.toDate) {
      const date = value.toDate();
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    }
    return value;
  }

}

