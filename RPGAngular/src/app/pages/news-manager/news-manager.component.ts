import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news-manager',
  templateUrl: './news-manager.component.html',
  styleUrls: ['./news-manager.component.css']
})
export class NewsManagerComponent implements OnInit {

  skeleton: any = [1,2,3,4,5];

  hasServerError = null;
  loading: boolean = false;

  newsList: any = [];
  loggedUser: any = null;

  first:any  = 0;
  maxResults:any = 10;

  constructor(private util: UtilService, private newsService: NewsService) { 
    this.loading = true;
    this.util.getUserByToken(this.util.getAccessToken).subscribe(data => {
      if(!data)
        this.util.redirectTo('./main');
      this.loggedUser = data;
      if(!this.loggedUser || (this.loggedUser && !this.loggedUser.manager))
        this.util.redirectTo('./main');
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
      this.util.redirectTo('./main');
    });
  }

  ngOnInit() {
    this.listNews(0, this.maxResults)
  }

  listNews(first, maxResults){
    this.loading = true;
    this.newsService.list(first, maxResults).subscribe((data: any) => {
      if(data && data.list){
        this.newsList = data;
      }
      this.loading = false;
      this.hasServerError = null;
      },
      error => {
        this.hasServerError = error;
        this.loading = false;
    });
  }

}
