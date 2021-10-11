import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../../service/news/news.service';
import {Title} from '@angular/platform-browser';
import {News} from '../../../model/news/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news: News[] = [];
  news1: News[] = [];
  news2: News[] = [];

  constructor(private newsService: NewsService, private titleService: Title) {
    this.titleService.setTitle('Tin tức');
  }

  ngOnInit(): void {
    this.getNewsLimit10();
    this.getNewsLimit5();
    this.getNewsMore();
  }

  getNewsLimit10() {
    this.newsService.getNewsLimit10().subscribe(value => {
      this.news = value;
    });
  }

  getNewsLimit5() {
    this.newsService.getNewsLimit5().subscribe(value => {
      this.news1 = value;
    });
  }

  getNewsMore() {
    this.newsService.getNewsMore().subscribe(value => {
      this.news2 = value;
    });
  }
}
