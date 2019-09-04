import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination-display',
  templateUrl: './pagination-display.component.html',
  styleUrls: ['./pagination-display.component.css']
})
export class PaginationDisplayComponent implements OnInit {

  @Input() page: Number = 0;
  @Input() first: Number = 0;
  @Input() itensPerPage: Number = 0;
  @Input() maxResults: Number = 0;
  @Input() totalRecords: Number = 0;
  pageInput: Number = 0;
  firstInput: Number = 0;
  itensPerPageInput: Number = 0;
  maxResultsInput: Number = 0;
  totalRecordsInput: Number = 0;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.initComponent();
  }

  initComponent() {
    this.firstInput = this.first;
    this.maxResultsInput = this.maxResults;
    this.itensPerPageInput = this.itensPerPage;
    this.pageInput = this.page;
    this.totalRecordsInput = this.totalRecords;
  }

  ngOnInit() {
    this.initComponent();
  }

}
