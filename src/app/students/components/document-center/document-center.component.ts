import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { DocumentCenter, DocumentCenterCategory } from 'src/app/shared/models/students/document-center';
import { DocumentCenterService } from '../../services/document-center.service';

@Component({
  selector: 'app-document-center',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './document-center.component.html',
  styleUrl: './document-center.component.scss'
})
export class DocumentCenterComponent {

  componentName: string = "Document Center"
  documentCenterList: DocumentCenter[] = [];
  documentCenterCategoryList: DocumentCenterCategory[] = [];
  skeleton: boolean = true;

  constructor(private DocumentCenterService: DocumentCenterService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getAllDocumentCenterDocuments();
  }
  getAllDocumentCenterDocuments() {
    this.DocumentCenterService.getAll().subscribe({
      next: (response) => {
        this.documentCenterList = response;
        this.skeleton = false;
        const uniqueCategoryList = [...new Set(this.documentCenterList.map(item => item.category))];

        for (var uniqueCategory of uniqueCategoryList) {
          const filterCategory = this.documentCenterList.filter(x => x.category == uniqueCategory);
          this.documentCenterCategoryList.push({ category: uniqueCategory, items: filterCategory });
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }
}
