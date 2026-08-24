import { Component, OnInit, signal, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';

export type PostCategory = 'Announcement' | 'Achievement' | 'Placement' | 'Scholarship' | 'Event' | 'Emergency';

export interface FeedPost {
  id: number;
  title: string;
  description: string;
  author: string;
  authorRole: string;
  avatar: string;
  createdOn: string | Date;
  postType: PostCategory;
  isPinned: boolean;
  imageUrls: string[];
  attachmentUrl: string;
  videoUrl: string;
  externalUrl: string;
  embedUrl?: string; // NEW: Added to support iframes
  views: number;
  likes: number;
  isLiked: boolean;
  priority: number;
  expiryDate: string | Date | null;
  isPublished: boolean;
}

@Component({
  selector: 'app-university-feed',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    TagModule,
    ButtonModule,
    ImageModule,
    SkeletonModule,
    TooltipModule
  ],
  templateUrl: './university-feed.component.html',
  styleUrls: ['./university-feed.component.scss']
})
export class UniversityFeedComponent implements OnInit {
  private static readonly NEW_POST_WINDOW_MS = 2 * 24 * 60 * 60 * 1000;

  onPdfClick = output<string>();

  posts = signal<FeedPost[]>([]);
  isLoading = signal<boolean>(true);
  expandedPosts = signal<Set<number>>(new Set());

  // Inject DomSanitizer to safely load iframes
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.fetchFeed();
  }

  fetchFeed() {
    this.isLoading.set(true);
    setTimeout(() => {
      const data = this.getDummyData();
      // Sort by id descending so the latest post appears on top
      data.sort((a, b) => b.id - a.id);
      this.posts.set(data);
      this.isLoading.set(false);
    }, 1500);
  }

  toggleReadMore(postId: number) {
    const currentSet = new Set(this.expandedPosts());
    if (currentSet.has(postId)) {
      currentSet.delete(postId);
    } else {
      currentSet.add(postId);
    }
    this.expandedPosts.set(currentSet);
  }

  isExpanded(postId: number): boolean {
    return this.expandedPosts().has(postId);
  }

  toggleLike(post: FeedPost) {
    const updatedPosts = this.posts().map(p => {
      if (p.id === post.id) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    });
    this.posts.set(updatedPosts);
  }

  // Safely bypass Angular security for the iframe
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getCategorySeverity(type: PostCategory): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' {
    const map: Record<PostCategory, any> = {
      Announcement: 'info',
      Achievement: 'success',
      Emergency: 'danger',
      Placement: 'contrast',
      Scholarship: 'warning',
      Event: 'secondary'
    };
    return map[type] || 'info';
  }

  getCategoryIcon(type: PostCategory): string {
    const map: Record<PostCategory, string> = {
      Announcement: 'pi pi-bullhorn',
      Achievement: 'pi pi-star-fill',
      Emergency: 'pi pi-exclamation-triangle',
      Placement: 'pi pi-briefcase',
      Scholarship: 'pi pi-graduation-cap',
      Event: 'pi pi-calendar'
    };
    return map[type] || 'pi pi-bell';
  }

  handlePdfView(url: string) {
    this.onPdfClick.emit(url);
  }

  hasValidCreatedOn(createdOn: string | Date): boolean {
    return this.toTimestamp(createdOn) !== null;
  }

  isNewPost(createdOn: string | Date): boolean {
    const createdOnTime = this.toTimestamp(createdOn);

    if (createdOnTime === null) {
      return false;
    }

    const age = Date.now() - createdOnTime;
    return age >= 0 && age <= UniversityFeedComponent.NEW_POST_WINDOW_MS;
  }

  private toTimestamp(value: string | Date): number | null {
    if (!value) {
      return null;
    }

    const date = value instanceof Date ? value : new Date(value);
    const timestamp = date.getTime();
    return Number.isNaN(timestamp) ? null : timestamp;
  }

  private getDummyData(): FeedPost[] {
    return [
      {
        id: 101,
        title: 'SkillO: Career Portal & Internships',
        description: 'The SkillO portal is your central hub for upcoming placements and internship opportunities. Ensure your profile is updated to receive the latest notifications tailored to your branch.',
        author: 'Training & Placement',
        authorRole: 'Career Services',
        avatar: 'assets/images/default-pic.jpg',
        createdOn: '', // Temporarily removed
        postType: 'Placement',
        isPinned: true,
        imageUrls: ['assets/images/Skillo.jpeg'],
        attachmentUrl: '',
        videoUrl: '',
        externalUrl: '',
        views: 1420,
        likes: 124,
        isLiked: false,
        priority: 1,
        expiryDate: null, // Temporarily removed
        isPublished: true
      },
      {
        id: 102,
        title: 'Scholarship for Students: Guidelines & Information',
        description: 'The updated guidelines for the current academic year student scholarships have been released. Please review the attached PDF carefully before submitting your applications to the administrative office.',
        author: 'Registrar Office',
        authorRole: 'Administration',
        avatar: 'assets/images/default-pic.jpg',
        createdOn: '', // Temporarily removed
        postType: 'Scholarship',
        isPinned: false,
        imageUrls: ['assets/images/Scholarship for Students.jpg'],
        attachmentUrl: 'assets/Partner_Documents/Common/Scholarship for students.pdf',
        videoUrl: '',
        externalUrl: '',
        views: 2103,
        likes: 342,
        isLiked: false,
        priority: 3,
        expiryDate: null, // Temporarily removed
        isPublished: true
      },
      {
        id: 103,
        title: 'University of Tokyo MEXT Scholarship 2027',
        description: 'Applications are now open for the prestigious University of Tokyo MEXT Scholarship for the 2027 academic year. Review the eligibility requirements and apply via the official LinkedIn opportunity link.',
        author: 'International Relations Cell',
        authorRole: 'Administration',
        avatar: 'assets/images/default-pic.jpg',
        createdOn: '', // Temporarily removed
        postType: 'Scholarship',
        isPinned: false,
        // Added a placeholder image of Tokyo/Japan for the preview
        imageUrls: ['assets/images/University_of_tokyo_MEXT.jpeg'],
        attachmentUrl: '',
        videoUrl: '',
        externalUrl: 'https://www.linkedin.com/posts/jayakrishnan-athipettah-ba228751_university-of-tokyo-mext-scholarship-2027-share-7472878979343933440-XGRo?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAE30dO4BKg4v1-Qcx7-huwuwn-iogTysaLM&utm_campaign=whatsapp',
        embedUrl: '', // Removed iframe embed
        views: 845,
        likes: 89,
        isLiked: true,
        priority: 2,
        expiryDate: null, // Temporarily removed
        isPublished: true
      },
      {
        id: 104,
        title: 'C-DAC Advanced Certificate Course in HPC-AI (FREE – NCVET Certified)',
        description: 'Centre for HPC Upskilling & Knowledge-sharing (C-HUK), C-DAC Bangalore announces a FREE Advanced Certificate Course in HPC-AI (worth ₹1,00,000), funded by MeitY, Government of India. Hands-on training on PARAM Supercomputers covering HPC, GPU, AI, Python, CUDA & OpenMP. Monthly stipend of ₹10,000 for eligible SC/ST/EWS/Women candidates. Open to B.E./B.Tech (All Branches), B.Sc., BCA, MCA, M.Sc., M.Tech graduates. Last date to apply: 6 July 2026. Training commences: 20 July 2026. Please see and inform ALL Engineering and Pharmacy students in CRM.',
        author: 'Training & Placement',
        authorRole: 'Career Services',
        avatar: 'assets/images/default-pic.jpg',
        createdOn: '', // Temporarily removed
        postType: 'Announcement',
        isPinned: true,
        imageUrls: ['assets/images/CDAC_HPC_AI_Course.jpg'],
        attachmentUrl: '',
        videoUrl: '',
        externalUrl: 'https://c-huk.cdacb.in',
        embedUrl: '',
        views: 0,
        likes: 0,
        isLiked: false,
        priority: 1,
        expiryDate: null, // Temporarily removed
        isPublished: true
      },
      {
        id: 105,
        title: 'OIST Japan 3-6 Month Fully Funded Research Internship 2027 (Students of 3rd and Final Year)',
        description: 'The Okinawa Institute of Science and Technology (OIST), Japan is offering a fully funded 3-6 month research internship for 2027. Eligible candidates include bachelor\'s students, specifically students of 3rd and final year, along with master\'s students and graduates. The internship includes round-trip airfare, accommodation, visa support, administrative assistance, a research allowance, and access to advanced laboratories. Interested students should complete the online application and submit the required documents before 15 October 2026.',
        author: 'Training & Placement',
        authorRole: 'Career Services',
        avatar: 'assets/images/default-pic.jpg',
        createdOn: '2026-07-25T00:00:00',
        postType: 'Placement',
        isPinned: true,
        imageUrls: ['assets/images/OIST.jpeg'],
        attachmentUrl: '',
        videoUrl: '',
        externalUrl: 'https://www.linkedin.com/posts/edidiongukpong_this-fully-funded-internship-isnt-in-japan-activity-7486127343288307712-uame?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADJXAZgB29lkgTk_GjJ1f5aVEV_nDLrD8tY',
        embedUrl: '',
        views: 0,
        likes: 0,
        isLiked: false,
        priority: 1,
        expiryDate: null,
        isPublished: true
      },
      {
        id: 106,
        title: 'University Sports Selection & House Captain/Vice-Captain Application',
        description: 'The University is inviting students to submit their preferences for participation in various sports activities. Each student is required to select TWO sports: one as Team Game and one as Individual Game. Students interested in serving as House Captain or Vice-Captain may also apply, provided they have prior sports experience and/or previous leadership experience in a sports-related role. The four University Houses are Patanjali House, Visvesvaraya House, Chanakya House, and Ramanujan House. Please provide accurate information while filling out the form.',
        author: 'Sports Office',
        authorRole: 'University Sports Committee',
        avatar: 'assets/images/default-pic.jpg',
        createdOn: '2026-08-21T00:00:00',
        postType: 'Event',
        isPinned: true,
        imageUrls: ['assets/images/University_Sports_Selection.jpg'],
        attachmentUrl: '',
        videoUrl: '',
        externalUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSddhREWMkTH_ZoNDqTfnzXdb9t7VoxOaQQpmCU23-u92RaREQ/viewform',
        embedUrl: '',
        views: 0,
        likes: 0,
        isLiked: false,
        priority: 1,
        expiryDate: null,
        isPublished: true
      },
    ];
  }
}