import { loggedUser } from './../../../config';
import { HomeService } from './../../services/home/home.service';
import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { profileUrl } from 'src/config';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  skeleton: any = [1,2,3,4,5];
  
  profileUrl: string = profileUrl;
  submitted: boolean = false;
  reload: boolean = false;
  loading: boolean = false;
  loadingTask: boolean = false;
  loadingNews: boolean = false;
  loadingClass: boolean = false;
  loadingEvents: boolean = false;

  pod: any = [];
  newsList: any = [];
  eventList: any = [];
  classList: any = [];
  taskList: any = [];
  hasServerError: boolean = false;

  selectedClass: any;
  user: any;


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(
    private homeService: HomeService,
    private util: UtilService,
    private elementRef: ElementRef
  ) { 
      
  }
ngOnInit() {
    this.listEvents();
    this.listNews();
    this.getUserById(loggedUser.id);
  }

  reloadNews(){
    this.listNews();
  }

  getClass(obj){
    this.selectedClass = obj;
  }

  getUserById(userId){
    this.loading = true;
    this.homeService.getFullUser(userId).subscribe(data => {
      this.user = data;
      this.classList = this.user.teamList;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  listNews(){
    this.loadingNews = true;
    this.homeService.listPublicNews().subscribe(data => {
      this.newsList = data;
      this.reload = false;
      this.loadingNews = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loadingNews = false;
      this.reload = false;
    });
  }

  listEvents(){
    this.loadingEvents = true;
    // if(!this.reload){
    //   this.loading = true;
    // }
    this.homeService.listPublicEvent().subscribe(data => {
      this.eventList = data;
      this.reload = false;
      this.loadingEvents = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loadingEvents = false;
      this.reload = false;
    });

  }

  // listTask(){
  //   this.loadingTask = true;
  //   if(!this.reload){
  //     this.loading = true;
  //   }
  //   this.taskService.listAll(1).subscribe(data => {
  //     this.taskList = data;
  //     for(var index = 0; index < this.taskList.length; index++){
  //       let startYear = this.taskList[index].startDate.substring(0, 4);
  //       let startMonth = this.taskList[index].startDate.substring(5, 7);
  //       let startDay = this.taskList[index].startDate.substring(8, 10);
  //       let endYear = this.taskList[index].endDate.substring(0, 4);
  //       let endMonth = this.taskList[index].endDate.substring(5, 7);
  //       let endDay = this.taskList[index].endDate.substring(8, 10);
  //       this.taskList[index].startDate = startDay + "/" + startMonth + "/" + startYear;
  //       this.taskList[index].endDate = endDay + "/" + endMonth + "/" + endYear;
  //     }
  //     setTimeout(() => {
  //       this.loadingTask = false;
  //       this.loading = false;
  //       this.reload = false;
  //     }, 1500);
  //     this.hasServerError = null;
  //   },
  //   error => {
  //     this.hasServerError = error;
  //     this.loadingTask = false;
  //     this.loading = false;
  //     this.reload = false;
  //   });
  // }

  // completeTask(task){
  //   this.submitted = true;
  //   this.loading = true;
  //   task.complete = task.complete ? false: true;
  //   task.startDate = Date.parse(task.startDate);
  //   task.endDate = Date.parse(task.endDate);
  //   this.taskService.update(task).subscribe(data => {
  //     this.reloadTask();
  //     this.loading = false;
  //     this.submitted = false;
  //     this.hasServerError = null;
  //   },
  //   error => {
  //     this.hasServerError = error;
  //     this.loading = false;
  //   });
  // }

}
