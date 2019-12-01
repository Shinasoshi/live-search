import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { DropDownOption } from '../../models/drop-down-option.interface';

@Component({
  selector: 'custom-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() currentFilter: DropDownOption;
  @Input() currentSorting: DropDownOption;
  @Output() filterBy: EventEmitter<DropDownOption> = new EventEmitter();
  @Output() sortBy: EventEmitter<DropDownOption> = new EventEmitter();
  @Output() removeFilters: EventEmitter<void> = new EventEmitter();

  showFilterSelect = false;
  showSortingSelect = false;
  filterOptionsAvailable: DropDownOption[];
  sortingOptionsAvailable: DropDownOption[] = [
    {
      label: 'Ascending',
      value: 'ASC'
    },
    {
      label: 'Descending',
      value: 'DESC'
    }
  ];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getFilterOptionsAvailable();
  }

  getFilterOptionsAvailable() {
    this.apiService.getFilterOptionsAvailable().pipe(take(1)).subscribe(
      (options: DropDownOption[]) => {
        this.filterOptionsAvailable = options;
      }
    );
  }

  showHideFilterSelect() {
    this.showFilterSelect = !this.showFilterSelect;
  }

  showHideSortingSelect() {
    this.showSortingSelect = !this.showSortingSelect;
  }

  filterSelected(filter: DropDownOption) {
    this.currentFilter = filter;
    this.filterBy.emit(this.currentFilter);
    this.showHideFilterSelect();
  }

  sortingSelected(sorting: DropDownOption) {
    this.currentSorting = sorting;
    this.sortBy.emit(this.currentSorting);
    this.showHideSortingSelect();
  }

  clearFilters() {
    this.removeFilters.emit();
  }
}
