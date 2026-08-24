import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DocumentCenterService } from 'src/app/executive-edge/services/document-center.service';
import { DocumentCenter, DocumentCenterCategory } from 'src/app/shared/models/executiveedge/DocumentCenter';

@Component({
  selector: 'app-document-center-global',
  standalone: true,
  imports: [ToastModule, ToolbarModule, ConfirmDialogModule, CommonModule, SkeletonModule],
  templateUrl: './document-center-global.component.html',
  styleUrl: './document-center-global.component.scss'
})
export class DocumentCenterGlobalComponent {
  componentName: string = 'Document Center';
  iconClass: string = '';
  documentCenterList: DocumentCenter[] = [];
  documentCenterCategoryList: DocumentCenterCategory[] = [];
  currentURL: string = '';
  department: string[] = [];
  isLoading: boolean = false;

  constructor(
    private DocumentCenterService: DocumentCenterService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof Scroll) {
        this.setIconClassBasedOnRoute(event.routerEvent.url);
      }
    });
  }

  ngOnInit(): void {
    this.currentURL = this.router.url;
    const url = this.currentURL.split("/");
    this.department.push(url[2]);
    this.getAllDocumentCenterDocuments();
  }

  getAllDocumentCenterDocuments() {
    this.isLoading = true;
    this.DocumentCenterService.getByDepartmentNames(this.department).subscribe({
      next: response => {
        if (response) {
          this.documentCenterList = response;

          const uniqueCategoryList = [...new Set(this.documentCenterList.map(item => item.category))];

          for (var uniqueCategory of uniqueCategoryList) {
            const filterCategory = this.documentCenterList.filter(x => x.category == uniqueCategory);
            this.documentCenterCategoryList.push({ category: uniqueCategory, items: filterCategory });
          }

          this.isLoading = false;
        }
      }, error: error => {
        this.isLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    });
  }

  setIconClassBasedOnRoute(url: string) {
    if (url.includes('home/smallbizgurus')) {
      this.iconClass = 'fas fa-handshake';
    } else if (url.includes('home/cloudbytes')) {
      this.iconClass = 'fas fa-cloud';
    } else if (url.includes('home/dashboard')) {
      this.iconClass = 'fas fa-home';
    } else if (url.includes('home/bigleads')) {
      this.iconClass = 'fas fa-briefcase';
    } else if (url.includes('home/mindspark')) {
      this.iconClass = 'fas fa-brain';
    } else if (url.includes('home/knowledgestand')) {
      this.iconClass = 'fas fa-book-open';
    } else if (url.includes('home/finpro')) {
      this.iconClass = 'fas fa-indian-rupee-sign';
    } else if (url.includes('home/executiveedge')) {
      this.iconClass = 'fas fa-user-tie';
    } else if (url.includes('home/digitalfingers')) {
      this.iconClass = 'fas fa-user-gear';
    } else if (url.includes('home/timeclockplus')) {
      this.iconClass = 'fas fa-calendar-days';
    } else if (url.includes('home/virtuallearn')) {
      this.iconClass = 'fas fa-atlas';
    } else if (url.includes('home/inventorymatrix')) {
      this.iconClass = 'fas fa-warehouse';
    } else if (url.includes('home/faq')) {
      this.iconClass = 'fas fa-person-circle-question';
    } else {
      this.iconClass = 'fas fa-cog';
    }
  }
}