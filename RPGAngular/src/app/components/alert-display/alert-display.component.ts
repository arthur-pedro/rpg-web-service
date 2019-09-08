import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-display',
  templateUrl: './alert-display.component.html',
  styleUrls: ['./alert-display.component.css']
})
export class AlertDisplayComponent implements OnInit {

  @Input() created:boolean;
  @Input() formError:boolean;
  @Input() serverError:boolean;
  @Input() page:boolean;
  @Input() message:any;
  @Output() closeType = new EventEmitter();

  _created: boolean = false;
  _formError: boolean = false;
  _serverError: boolean = false;
  _page: boolean = false;
  _message: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.initComponent();
  }

  initComponent() {
    this._created = this.created;
    this._formError = this.formError;
    this._serverError = this.serverError;
    this._page = this.page;
    this._message = this.message;
  }

  ngOnInit() {
    this.initComponent();
  }

  close(type){
    this.closeType.emit(type);
  }

}
