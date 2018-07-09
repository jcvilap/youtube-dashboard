import {Pipe, PipeTransform} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';
import * as moment from 'moment';

@Pipe({
  name: 'timeFromNow'
})
export class TimeFromNowPipe implements PipeTransform {

  constructor() {
  }

  transform(date: string): SafeHtml {
    return moment.utc(date).fromNow();
  }
}
