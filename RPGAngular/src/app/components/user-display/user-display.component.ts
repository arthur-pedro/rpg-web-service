import { Component, OnInit, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  @Input() userObject: any;
  @Input() simpleLayout: boolean = false;
  @Input() textColorClass: String = "";
  @Input() displayClass: String = "inline m-l-10";
  
  @Input() noAction: boolean = false;
  @Input() noLink: boolean = false;

  @Output() selectedAction = new EventEmitter();

  user: any;
  simple: boolean = true;
  textColor: String = "";
  display: String = "ml-2";
  externalCode: boolean = false;
  
  _noLink:boolean = false;
  _noAction:boolean = false;
  
  constructor(public util: UtilService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.initComponent();
  }

  initComponent() {
    this.user = this.userObject;
    this.simple = this.simpleLayout;
    this.textColor = this.textColorClass;
    this.display = this.displayClass;
    this._noLink = this.noLink;
    this._noAction = this.noAction;
  }

  ngOnInit() {
    this.initComponent();
  }

  action(res){
    this.selectedAction.emit(res);
  }


}
