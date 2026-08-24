import { SharedModule } from '@/shared.module';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
// import { SharedModule } from '@/shared.module';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-lazy-loader',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './lazy-loader.component.html',
  styleUrl: './lazy-loader.component.scss'
})
export class LazyLoaderComponent {
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.isLoading$;
  }
}
