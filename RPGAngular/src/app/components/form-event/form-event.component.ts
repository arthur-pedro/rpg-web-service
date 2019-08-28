import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event/event.service';
import { loggedUser } from 'src/config';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.css']
})
export class FormEventComponent implements OnInit {

  froadaDescription: any;
  public options: Object = {
    placeholderText: 'Digite a descrição do evento aqui!',
    charCounterCount: true,
    heightMin: 200,
    heightMax: 200,
    listAdvancedTypes: true,
    toolbarButtons: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsXS: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsSM: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
    toolbarButtonsMD: ['fullscreen','bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL','formatUL'],
  }

  eventForm: FormGroup;
  classId: any;

  eventTip: boolean = false;
  tip: boolean = true;
  loading: boolean = false;
  submitted: boolean = false;
  hasServerError: boolean = false;
  isCreated: boolean = false;


  constructor(
    private formGroup: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('id');
    this.eventForm = this.formGroup.group({
      title: ['', Validators.required],
      description: [''],
      publicEvent: [''],
      expireDate: ['', Validators.required],
      teamList: [''],
      expired: false,
      creatorId: 0,
    })
  }

  getTip(type){
    if(type == "title"){
      this.eventTip = true;
      this.tip = false;
    }
  }

  createEvent(){
    this.loading = true;
      this.submitted = true;
      if(!this.eventForm.valid){
        this.loading = false;
        return;
      }
      this.eventForm.patchValue({
        creatorId: loggedUser.id,
        teamList: [{id: this.classId ? this.classId : null}],
        publicEvent: this.eventForm.value.publicNews == "Sim" ? true : false
      });
      this.eventForm.disable();
      this.eventService.create(this.eventForm.getRawValue()).subscribe(data => {
        this.isCreated = true;
        this.eventForm.enable();
        this.eventForm.reset();
        this.submitted = false;
        this.loading = false;
        this.hasServerError = null;
      },
      error => {
        this.eventForm.enable();
        this.hasServerError = error;
        this.loading = false;
      });
    }

}
