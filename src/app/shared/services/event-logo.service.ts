import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface EventLogo {
    startDate: Date;
    endDate: Date;
    gifPath: string;
    staticLastFramePath: string;
    initialDelay: number;
    gifDisplayDuration: number;
    gifPlayDuration: number;
    animationGifPath?: string; // Optional, for future use
}

@Injectable({
    providedIn: 'root'
})
export class EventLogoService {
    private pCode: string = environment.partner.partnerCode;
    private events: EventLogo[] = [
        {
            //Rakhi Event (not-fixed)
            startDate: new Date('2025-08-09T00:00:00'),
            endDate: new Date('2025-08-11T23:59:59'),
            gifPath: '../../assets/animations/rakhi.gif',
            staticLastFramePath: '../../assets/animations/rakhi.gif',
            initialDelay: 5000,
            gifDisplayDuration: 5000,
            gifPlayDuration: 2600,
            animationGifPath: '../../assets/animations/rakhi2.gif',
        },
        {
            // Independence Day Event (fixed)
            startDate: new Date('2025-08-11T23:00:00'),
            endDate: new Date('2025-08-15T17:00:00'),
            gifPath: '../../assets/animations/independence.gif',
            staticLastFramePath: '../../assets/animations/independence_lastframe.png',
            initialDelay: 5000,
            gifDisplayDuration: 10000,
            gifPlayDuration: 2600,
            animationGifPath: '../../assets/animations/independence2.gif',
        },
        {
            // Janmashtami Event (not-fixed)
            startDate: new Date('2025-08-15T17:00:01'),
            endDate: new Date('2025-08-16T23:59:59'),
            gifPath: '../../../assets/animations/janmasthtmi.gif',
            staticLastFramePath: '../../../assets/animations/janmasthami_lastframe.png',
            initialDelay: 5000,
            gifDisplayDuration: 10000,
            gifPlayDuration: 2600,
            animationGifPath: '../../assets/animations/independence2.gif',
        },
        {
            // DurgaPuja Event (not-fixed)
            startDate: new Date('2025-09-21T05:00:01'),
            endDate: new Date('2025-10-02T23:59:59'),
            gifPath: '../../../assets/animations/DURGAPUJA.gif',
            staticLastFramePath: '../../../assets/animations/DURGAPUJA.gif',
            initialDelay: 5000,
            gifDisplayDuration: 6000,
            gifPlayDuration: 2600,
            animationGifPath: '../../../assets/animations/durgaPuja3.gif',
        },
        {
            // DurgaPuja Event (not-fixed)
            startDate: new Date('2025-10-17T00:00:01'),
            endDate: new Date('2025-10-22T23:59:59'),
            gifPath: '../../../assets/animations/diwali.gif',
            staticLastFramePath: '../../../assets/animations/diwali.gif',
            initialDelay: 5000,
            gifDisplayDuration: 6000,
            gifPlayDuration: 2600,
            animationGifPath: '../../../assets/animations/durgaPuja3.gif',
        },
        {
            // Chhath Puja
            startDate: new Date('2025-10-24T00:00:01'),
            endDate: new Date('2025-10-28T23:59:59'),
            gifPath: '../../../assets/animations/chhathPujaLogo.gif',
            staticLastFramePath: '../../../assets/animations/chhathPujaLogo.gif',
            initialDelay: 5000,
            gifDisplayDuration: 6000,
            gifPlayDuration: 2600,
            animationGifPath: '../../../assets/animations/chhathPuja.gif',
        },

        {
            // Makar Sankranti
            startDate: new Date('2026-01-13T00:00:01'),
            endDate: new Date('2026-01-15T23:59:59'),
            gifPath: '',
            staticLastFramePath: '',
            initialDelay: 5000,
            gifDisplayDuration: 6000,
            gifPlayDuration: 2600,
            animationGifPath: '../../../assets/animations/makarSankranti.gif',
        },

        {
            // Republic Day
            startDate: new Date('2026-01-26T00:00:01'),
            endDate: new Date('2026-01-17T23:59:59'),
            gifPath: '',
            staticLastFramePath: '',
            initialDelay: 5000,
            gifDisplayDuration: 6000,
            gifPlayDuration: 2600,
            animationGifPath: '../../../assets/animations/republicDay.gif',
        },

        // Add more events here
    ];

    private get defaultLogo(): string {
        return environment.partner.logo_url;
    }

    getCurrentEvent(): EventLogo | null {
        const now = new Date();
        const event = this.events.find(e => now >= e.startDate && now <= e.endDate) || null;

        if (event) {
            if (!event.gifPath) {
                event.gifPath = this.defaultLogo;
            }
            if (!event.staticLastFramePath) {
                event.staticLastFramePath = this.defaultLogo;
            }
        }

        return event;
    }

    checkEventDate(): boolean {
        const today = new Date();
        const expiryDate = new Date('August 17, 2025');
        if (today < expiryDate) {
            return true;
        }

        return false;
    }

    checkFoundationDay(): boolean {
        const today = new Date();
        let foundationDayDate: Date;

        // Partner-specific foundation day cases
        switch (this.pCode) {
            case 'P10001':
                // Foundation day: September 23rd
                foundationDayDate = new Date(today.getFullYear(), 8, 23);
                break;

            case 'P10002':
                // Foundation day: September 23rd
                foundationDayDate = new Date(today.getFullYear(), 8, 23);
                break;

            default:
                // Default foundation day: September 23rd (if partner code not found)
                foundationDayDate = new Date(today.getFullYear(), 8, 23);
                break;
        }

        if (today.getMonth() === foundationDayDate.getMonth() &&
            today.getDate() === foundationDayDate.getDate()) {
            return true;
        } else {
            return false;
        }
    }

    checkJharkhandFoundationDay() {
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth(); // 0-indexed (November = 10)

        return (currentMonth === 10 && currentDay >= 12 && currentDay <= 15);
    }
}