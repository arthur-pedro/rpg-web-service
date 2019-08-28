import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class/class.service';
import { profileUrl, loggedUser } from 'src/config';
import { UtilService } from 'src/app/services/util/util.service';
import { skeleton, userStatus } from 'src/app/model/util';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  filter: any;

  skeleton2: any = skeleton.skeleton2;
  skeleton6: any = skeleton.skeleton6;
  profileUrl: string = profileUrl;

  showButton:  boolean = false;
  hasServerError: boolean = false;
  loading: boolean = false;
  
  creating: boolean = false;
  isTask: boolean = false;
  isNews: boolean = false;
  isEvent: boolean = false;

  classId: any;
  selectedClass: any;

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.classService.getById(this.classId).subscribe(data => {
      this.selectedClass = data;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

  createTask(){
    this.creating = true;
    this.isTask = true;
    this.isNews = false;
    this.isEvent = false;
  }

  createNews(){
    this.creating = true;
    this.isTask = false;
    this.isNews = true;
    this.isEvent = false;
  }
  
  createEvent(){
    this.creating = true;
    this.isTask = false;
    this.isNews = false;
    this.isEvent = true;
  }

  deleteTask(task){
    this.loading = true;
    this.classService.deleteTask(task.id).subscribe(data => {
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }

}
