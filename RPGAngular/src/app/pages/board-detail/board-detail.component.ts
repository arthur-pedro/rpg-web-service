import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/services/board/board.service';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {

  publication: any = {};

  showCommentField: boolean = false;

  hasServerError: boolean = false;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private utilService: UtilService,
    private publicationService: BoardService
  ) { }

  ngOnInit() {
    this.publication.id = this.route.snapshot.paramMap.get('id');
    if(!this.publication.id) this.utilService.redirectTo("/main");
    this.loading = true;
    this.publicationService.get(this.publication.id).subscribe(data => {
      this.publication = data;
      this.loading = false;
      this.hasServerError = null;
    },
    error => {
      this.hasServerError = error;
      this.loading = false;
    });
  }
  
  comment(){
    this.showCommentField = true;
  }

}
