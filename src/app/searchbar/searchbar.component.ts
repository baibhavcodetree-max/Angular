import { Component } from '@angular/core';
import { ProductService} from '../services/product.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: false,
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})

export class SearchbarComponent {

  filteredProducts:any[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  Products:any[] = [];

  constructor(private productservice: ProductService) {}

  onSearchChange() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.productservice.getProductRelatedByslug(this.searchTerm).subscribe({
        next:(data) => {
          this.filteredProducts = data,
          this.isLoading = false;
        },
        error:(err) => {
          alert('Failed to load products' + err.message);
          this.isLoading = false;
        }
      });
    }

    this.filteredProducts = this.Products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category?.name.toLowerCase().includes(term)
    );
  }

}
