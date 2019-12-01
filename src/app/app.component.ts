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
    let elementsToPrepare = [...this.elements];

    if (this.filter) {
      elementsToPrepare = elementsToPrepare.filter(element => element.format === this.filter.value);
    }

    if (this.sort && this.sort.value === 'ASC') {
      elementsToPrepare = elementsToPrepare.sort(
        (currentElement: CustomElementInterface, nextElement: CustomElementInterface) =>  {
          return currentElement.label.localeCompare(nextElement.label);
        });
    }

    if (this.sort && this.sort.value === 'DESC') {
      elementsToPrepare = elementsToPrepare.sort(
        (currentElement: CustomElementInterface, nextElement: CustomElementInterface) =>  {
          return nextElement.label.localeCompare(currentElement.label);
        });
    }

    if (this.search) {
      elementsToPrepare = elementsToPrepare.filter(element => element.label.includes(this.search));
    }

    this.preparedElements = elementsToPrepare;
  }

  clearFilters() {
    this.filter = null;
    this.sort = null;
    this.search = '';

    this.prepareElements();
  }
}
