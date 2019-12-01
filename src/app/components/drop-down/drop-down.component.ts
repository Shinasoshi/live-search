import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropDownOption } from '../../models/drop-down-option.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'custom-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  animations: [
    trigger('basicEnterLeave', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class DropDownComponent implements OnInit {
  @Input() options: DropDownOption[];
  @Output() clickOutside: EventEmitter<void> = new EventEmitter();
  @Output() optionClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickOutside() {
    this.clickOutside.emit();
  }

  onOptionsClick(event: Event, value: any) {
    event.stopPropagation();
    this.optionClicked.emit(value);
  }

}
