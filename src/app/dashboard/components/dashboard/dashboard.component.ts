import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { DashboardCardsSkeletonComponent } from '@/app/global/components/skeletons/dashboard-cards-skeleton/dashboard-cards-skeleton.component';
import { EmployeeCalenderComponent } from '@/app/time-clock-plus/components/common-components/employee-calender/employee-calender.component';

interface TodoItem {
    id: number;
    description: string;
    status: string;
    created: string;
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgTemplateOutlet, FormsModule, AvatarModule, ButtonModule, ScrollPanelModule, SelectModule, TableModule, TabsModule, TagModule, DashboardCardsSkeletonComponent, EmployeeCalenderComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    readonly loading = signal(false);
    readonly statusOptions = ['NEW', 'In Progress', 'COMPLETED'];

    readonly notifications = [
        { title: 'Marks entry awaiting review', detail: 'B.Tech Semester VI · 2 hours ago', icon: 'pi pi-pencil', tone: 'orange' },
        { title: 'Academic calendar published', detail: 'Session 2026–27 · Yesterday', icon: 'pi pi-calendar', tone: 'blue' },
        { title: 'New work assignment', detail: 'Department verification · Yesterday', icon: 'pi pi-briefcase', tone: 'orange' },
        { title: 'Library notice updated', detail: 'Circulation policy · 18 Aug', icon: 'pi pi-book', tone: 'blue' }
    ];

    readonly studentHolidays = [
        { name: 'Republic Day', date: '26 Jan 2027', type: 'National', description: 'University closed' },
        { name: 'Holi', date: '22 Mar 2027', type: 'Festival', description: 'Student holiday' },
        { name: 'Summer Break', date: '15 May 2027', type: 'Academic', description: 'Semester break begins' }
    ];

    readonly organisationHolidays = [
        { name: 'Republic Day', date: '26 Jan 2027', type: 'National', description: 'Office closed' },
        { name: 'Independence Day', date: '15 Aug 2027', type: 'National', description: 'Flag hoisting ceremony' },
        { name: 'Foundation Day', date: '18 Dec 2027', type: 'Event', description: 'University celebration' }
    ];

    readonly marks = [
        { session: '2026–27', program: 'B.Tech CSE', semester: 'VI', subject: 'Artificial Intelligence', code: 'CSE-601' },
        { session: '2026–27', program: 'MBA', semester: 'II', subject: 'Financial Management', code: 'MBA-204' },
        { session: '2026–27', program: 'BCA', semester: 'IV', subject: 'Web Technologies', code: 'BCA-405' }
    ];

    todos: TodoItem[] = [
        { id: 1, description: 'Review faculty workload', status: 'In Progress', created: '22 Aug 2026' },
        { id: 2, description: 'Approve academic calendar', status: 'NEW', created: '21 Aug 2026' },
        { id: 3, description: 'Publish department notice', status: 'COMPLETED', created: '20 Aug 2026' }
    ];

    addTodo(): void {
        const nextId = Math.max(0, ...this.todos.map((todo) => todo.id)) + 1;
        this.todos = [{ id: nextId, description: 'New task', status: 'NEW', created: '22 Aug 2026' }, ...this.todos];
    }

    removeTodo(id: number): void {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    todoSeverity(status: string): 'success' | 'warn' | 'info' {
        if (status === 'COMPLETED') return 'success';
        if (status === 'In Progress') return 'warn';
        return 'info';
    }

    holidaySeverity(type: string): 'success' | 'warn' | 'info' {
        return type === 'National' ? 'success' : type === 'Festival' || type === 'Event' ? 'warn' : 'info';
    }
}
