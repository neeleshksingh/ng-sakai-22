import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { environment } from 'src/environments/environment';
import { MessageFromDeskService } from '../../services/message-from-desk.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    DividerModule,
    PanelModule,
    AccordionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  messagesFromTheDesks : any[] = [];
  leadership : any[] = [];
  heroImage : string = '';

  carouselResponsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  upcomingEvents = [
    { title: 'Fall Semester Registration', date: 'August 15, 2025', location: 'Online Portal' },
    { title: 'New Student Orientation', date: 'August 25, 2025', location: 'University Hall' },
    { title: 'Alumni Homecoming Weekend', date: 'October 10-12, 2025', location: 'Main Campus' }
  ];

  universityValues = [
    { title: 'Excellence', description: 'Striving for the highest standards in education and research.' },
    { title: 'Innovation', description: 'Encouraging creative thinking and breakthrough solutions.' },
    { title: 'Inclusivity', description: 'Creating a diverse and welcoming community for all.' },
    { title: 'Integrity', description: 'Upholding ethical standards in all our endeavors.' },
    { title: 'Collaboration', description: 'Fostering strong partnerships across departments, students, alumni, and industry to achieve shared goals.' },
    { title: 'Student-Centricity', description: 'Prioritizing the needs, success, and well-being of students in every decision and service provided.' }
  ];

  // University quotes
  quotes = [
    { text: 'Education is not the filling of a pail, but the lighting of a fire.', author: 'W.B. Yeats' },
    { text: 'The function of education is to teach one to think intensively and to think critically.', author: 'Martin Luther King Jr.' },
    { text: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' }
  ];

  constructor(
    private router: Router,
    private messageService : MessageService,
    private messageFromDeskService: MessageFromDeskService
  ) {}
  
  ngOnInit() {
    this.getAllMessagesFromDesk();
    const matchedPartner = environment.partner;
  }

  getAllMessagesFromDesk() {
    this.messageFromDeskService.getAll().subscribe({
      next: (messageFromDesk) => {
        if (messageFromDesk && messageFromDesk.length > 0) {
          this.messagesFromTheDesks = messageFromDesk;
          this.heroImage = this.messagesFromTheDesks[0].heroImageUrl;
          document.documentElement.style.setProperty('--hero-bg-image', `url(${this.heroImage})`);
          
          // Process HTML content if needed
          this.messagesFromTheDesks.forEach(message => {
            // Enable HTML in quotes if they contain HTML tags
            if (message.quote.includes('<br>')) {
              // Already handled by [innerHTML] binding
            }
          });
        }
      },
      error: (error: any) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: error.error?.message || 'Failed to load leadership data.' 
        });
      }
    });
  }
}
