import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@/shared.module';

import { Book } from 'src/app/shared/models/virtuallearn/book';
import { BookSearchResponse, Criteria, SearchCategoryResponse, SearchCriteria } from 'src/app/shared/models/virtuallearn/book-search-response';
import { BookService } from '../../services/book.service';
;
@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.scss'
})
export class SearchBookComponent {

  componentName: string = "Search Book"
  searchTerm: string = "";
  bookSearchResponse: BookSearchResponse = {
    books: []
  };
  bookSearchResponseFilter: BookSearchResponse = {
    books: []
  };
  bookDetails: Book = {};
  searchCategories: SearchCategoryResponse[] = [];
  searchCriteria: SearchCriteria[] = [];
  criteria: Criteria[] = [];
  selectedCategories: any[] = [];
  bookSearched: boolean = false;
  bookDetailsDialog: boolean = false;
  displayBooks: boolean = false;
  noBooks: boolean = false;

  constructor(
    private bookService: BookService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.bookDetailsDialog = false;
  }

  searchBook() {
    this.displayBooks = false;
    this.noBooks = false;
    this.bookService.GetByTerms(this.searchTerm).subscribe(response => {

      this.bookSearched = true;
      this.bookSearchResponse = response;
      this.bookSearchResponseFilter = response;
      this.searchCategories = response.searchCategories ?? [];
      if (response.books.length > 0) {
        this.displayBooks = true;
      } else {
        this.noBooks = true;
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    });

  }
  onSearchCategoryChange(searchCategoryName: any, searchCategoryItemName: any, event: any) {

    const category = { key: searchCategoryName, value: searchCategoryItemName };
    if (event.checked) {
      if (!this.criteria.some(item => item.key === searchCategoryName && item.value === searchCategoryItemName)) {
        this.criteria.push(category);
      } else {
        this.criteria = this.criteria.filter(item => !(item.key === searchCategoryName && item.value === searchCategoryItemName));
      }

      this.bookSearchResponseFilter = JSON.parse(JSON.stringify(this.bookSearchResponse));
      if (this.criteria.length > 0) {
        const groupedCriteria = this.criteria.reduce((acc, { key, value }) => {
          if (key && value) { // Ensure both key and value are not undefined
            key = key.toLowerCase();
            value = value.toLowerCase();

            if (!acc[key]) acc[key] = [];
            acc[key].push(value);
          }
          return acc;
        }, {} as Record<string, string[]>); // Explicitly typing the accumulator


        const normalizedCriteria: Record<string, string[]> = {};
        Object.entries(groupedCriteria).forEach(([key, values]) => {
          const lowerKey = key.toLowerCase();
          normalizedCriteria[lowerKey] = values.map(v => v.toString().toLowerCase());
        });

        this.bookSearchResponseFilter.books = this.bookSearchResponseFilter.books?.filter((book: any) => {
          return Object.entries(book).some(([key, value]) => {
            const lowerKey = key.toLowerCase();
            const lowerValue = value?.toString().toLowerCase();
            return normalizedCriteria[lowerKey]?.includes(lowerValue ?? '');
          });
        });
      }
    }
  }
  openBookDetailsDialog(bookId: number) {
    this.bookDetailsDialog = true;
    this.bookDetails = this.bookSearchResponseFilter.books?.find(x => x.id == bookId) ?? {};
  }
}
