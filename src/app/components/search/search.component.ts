import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'custom-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() value: string;
  @Output() newValue: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.value = '';
  }

  onKeyup(event: any) {
    this.newValue.emit(event.target.value);
  }


}
