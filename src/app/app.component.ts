import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ApiService } from './services/api.service';
import { CustomElementInterface } from './models/element.interface';
import { DropDownOption } from './models/drop-down-option.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  elements: CustomElementInterface[];
  preparedElements: CustomElementInterface[];
  filter: DropDownOption;
  sort: DropDownOption;
  search: string;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getElements();
  }

  getElements() {
    this.apiService.getElements().pipe(take(1)).subscribe(
      (elements: CustomElementInterface[]) => {
        this.elements = elements;
        this.prepareElements();
      }
    );
  }

  filterBy(option: DropDownOption) {
    this.filter = option;
    this.prepareElements();
  }

  sortBy(option: DropDownOption) {
    this.sort = option;
    this.prepareElements();
  }

  searchBy(query: any) {
    this.search = query;
    this.prepareElements();
  }

  prepareElements() {
    this.preparedElements = this.elements;

    if (this.filter) {
      this.preparedElements = this.preparedElements.filter(element => element.format === this.filter.value);
    }

    if (this.sort && this.sort.value === 'ASC') {
      this.preparedElements = this.preparedElements.sort((a, b) => {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        }
      );
    }

    if (this.sort && this.sort.value === 'DESC') {
      this.preparedElements = this.preparedElements.sort((a, b) => {
          if (a.label > b.label) {
            return -1;
          }
          if (a.label < b.label) {
            return 1;
          }
          return 0;
        }
      );
    }

    if (this.search) {
      this.preparedElements = this.preparedElements.filter(element => element.label.includes(this.search));
    }
  }

  clearFilters() {
    this.filter = null;
    this.sort = null;
    this.search = '';

    this.prepareElements();
  }
}
