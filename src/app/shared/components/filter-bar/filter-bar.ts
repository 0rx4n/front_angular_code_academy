import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type Filters = {
  marka?: string;
  model?: string;
  city?: string;
  ban?: string;
  minYear?: number | null;
  maxYear?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
};

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.html',
  styleUrls: ['./filter-bar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBar {
  @Input() count = 0;
  @Input() markaOptions: string[] = [];
  @Input() modelOptions: string[] = [];
  @Input() cityOptions: string[] = [];
  @Input() banOptions: string[] = [];

  @Input() set filters(v: Filters | undefined) {
    this.local = { ...this.local, ...(v || {}) };
  }

  @Output() apply = new EventEmitter<Filters>();
  @Output() markaChange = new EventEmitter<string>();

local: Filters = {
  marka: '', model: '', city: '', ban: '',
  minYear: null, maxYear: null,
  minPrice: null, maxPrice: null
};

  emitApply() {
    this.apply.emit(this.local);
  }

  resetFilters() {
    this.local = {
      marka: '', model: '', city: '', ban: '',
      minYear: null, maxYear: null,
      minPrice: null, maxPrice: null
    };
    this.emitApply();
  }
}
