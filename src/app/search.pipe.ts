import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(todo: Array<any>, word: string): Array<any> {

    return todo.filter((elm) => elm.title.includes(word));

  }

}
