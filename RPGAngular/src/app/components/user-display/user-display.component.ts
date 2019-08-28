import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
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
  @Input() showExternalCode: boolean = false;
  @Input() noAction: boolean = false;
  user: any;
  simple: boolean = true;
  noLink:boolean = false;
  textColor: String = "";
  display: String = "ml-2";
  externalCode: boolean = false;
  constructor(public util: UtilService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.initComponent();
  }

  initComponent() {
    this.user = this.userObject;
    this.simple = this.simpleLayout;
    this.textColor = this.textColorClass;
    this.display = this.displayClass;
    this.externalCode = this.showExternalCode;
    this.noLink = this.noAction;
  }

  ngOnInit() {
    this.initComponent();
  }


}
