import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public selectedTag: string;


  constructor() {
  }
}
