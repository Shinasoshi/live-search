import { Component, Input, OnInit } from '@angular/core';
import { CustomElementInterface } from '../../models/element.interface';

@Component({
  selector: 'custom-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() elements: CustomElementInterface[];

  constructor() { }

  ngOnInit() {
  }

}
