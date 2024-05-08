import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(){}

  @Input() public items: string[] = [];
  public filteredItems: string[] = this.items;

  @Output() selectedFilter = new EventEmitter<string[]>();

  show: boolean = false;

  public filterResults(text: string) {
    if(!text || text.length == 0){
      this.filteredItems = [];
      return;
    }
    this.filteredItems = [];
    this.filteredItems = this.items.filter(items => items.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()));
  }

  searchFiltered(){
    if(this.filteredItems.length > 0) this.selectedFilter.emit(this.filteredItems);
  }

  onFocus(){
    this.show = true;
  }

  onBlur(){
    setTimeout(() => this.show = false, 400);
  }

  optionSelected(item: string){
    this.selectedFilter.emit([item]);
  }
}
