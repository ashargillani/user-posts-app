import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: { [key: string]: any }, ...args: string[]): any {
    const keys = [];

    // tslint:disable-next-line:forin
    for (const key in value) {
      keys.push(key);
    }

    return keys;
  }

}
