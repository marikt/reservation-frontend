import {PexelImg} from './pexel-img';

/**
 {
  'total_results': 23,
  'page': 1,
  'per_page': 25,
  'photos': [
  {}
  },
 */

export class PexelImgs {

    public total_results: number;
    public page: number;
    public per_page: number;
    public photos: PexelImg[];

    constructor() {

    }

}

