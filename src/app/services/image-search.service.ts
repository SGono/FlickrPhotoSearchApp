import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface FlickrImage {
  id: string;
  secret: string;
  title: string;
  server: string;
  farm: string;

}

export interface ImageOutput {
  photos: {
    photo: FlickrImage[];
  };
}

@Injectable({
  providedIn: 'root'
})

export class ImageSearchService {

  previousKeyword: string;
  currentPage = 1;

  constructor(private http: HttpClient) { }

  searchImageKeyword(keyword: string) {
    if (this. previousKeyword === keyword) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
    }
    this. previousKeyword = keyword;
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickrPhoto.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12&page=${this.currentPage}`;

    return this.http.get(url + params).pipe(map((res: ImageOutput) => {
      const urlArr = [];
      res.photos.photo.forEach((pic: FlickrImage) => {
        const imageObj = {
          url: `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}`,
          title: pic.title
        };
        urlArr.push(imageObj);
      });
      return urlArr;
    }));
  }
}
