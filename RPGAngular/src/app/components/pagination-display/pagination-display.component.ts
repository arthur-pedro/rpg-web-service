import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-display',
  templateUrl: './pagination-display.component.html',
  styleUrls: ['./pagination-display.component.css']
})
export class PaginationDisplayComponent implements OnInit {

  @Input() page:any = 0;
  @Input() first:any  = 0;
  @Input() itensPerPage:any = 0;
  @Input() maxResults:any = 0;
  @Input() totalRecords:any = 0;
  @Input() list: any = [];

  @Output() selectedPage = new EventEmitter();
  
  pageInput:any = 0;
  firstInput:any = 0;
  itensPerPageInput:any = 0;
  maxResultsInput:any = 0;
  totalRecordsInput:any = 0;
  listInput:any = [];
  
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.load();
      let count = Math.ceil(this.totalRecords / this.maxResults); 
      for(var i = 0; i < count; i++){
        this.listInput.push(i);
      }
    }, 1000);
    
  }

  load(){
    this.firstInput = this.first;
    this.maxResultsInput = this.maxResults;
    this.itensPerPageInput = this.itensPerPage;
    this.pageInput = this.page;
    this.totalRecordsInput = this.totalRecords;
    this.listInput = this.list;
  }

  reload(page){
    let selectedPage = ((page+1) * this.maxResults) - this.maxResults
    this.selectedPage.emit(selectedPage);
  }

}
