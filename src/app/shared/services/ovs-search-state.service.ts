// ovs-search-state.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OvsSearchStateService {
  private searchState: any = null;

  setSearchState(data: any) {
    this.searchState = data;
  }

  getSearchState() {
    return this.searchState;
  }

  hasState(): boolean {
    return !!this.searchState;
  }
}