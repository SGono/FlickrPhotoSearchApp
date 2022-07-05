import { Component, OnInit } from '@angular/core';
import { ImageSearchService } from '../services/image-search.service';

@Component({
  selector: 'app-photo-search',
  templateUrl: './photo-search.component.html',
  styleUrls: ['./photo-search.component.css']
})
export class PhotoSearchComponent implements OnInit {
  photos = [];
  keyword: string;

  constructor(private imageSearchService: ImageSearchService) { }

  ngOnInit() {
  }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.imageSearchService.searchImageKeyword(this.keyword)
      .toPromise()
      .then(res => {
        this.photos = this.photos.concat(res);
      });
    }
  }

  searchPhoto(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.imageSearchService.searchImageKeyword(this.keyword)
      .toPromise()
      .then(res => {
        this.photos = res;
      });
    }
  }

}
