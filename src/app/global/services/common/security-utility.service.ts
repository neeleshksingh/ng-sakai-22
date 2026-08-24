import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SecurityUtilityService {
    private contextMenuHandler = (event: Event) => event.preventDefault();
    private keydownHandler = (event: KeyboardEvent) => {
        // F12
        if (event.key === 'F12') {
            event.preventDefault();
        }
        // Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+Shift+C (Inspect tools)
        if (
            event.ctrlKey &&
            event.shiftKey &&
            (event.key.toLowerCase() === 'i' ||
                event.key.toLowerCase() === 'j' ||
                event.key.toLowerCase() === 'c')
        ) {
            event.preventDefault();
        }
        // Ctrl+U (view source)
        if (event.ctrlKey && event.key.toLowerCase() === 'u') {
            event.preventDefault();
        }
        // Ctrl+Shift+K (Firefox console shortcut)
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'k') {
            event.preventDefault();
        }
    };

    currentUserJsonString = localStorage.getItem('currentUser') ?? "";

    constructor() { }

    /**
     * Applies security restrictions for a specific partner code.
     * Disables right-click and certain keyboard shortcuts (e.g., F12, Ctrl+Shift+I, Ctrl+U).
     */
    applySecurityRestrictions(): void {
        if (environment.partner.partnerCode.toUpperCase() === 'P10002') {
            document.addEventListener('contextmenu', this.contextMenuHandler);
            document.addEventListener('keydown', this.keydownHandler);
        }
    }

    /**
     * Removes security restrictions for a specific partner code.
     * Removes the event listeners for right-click and keyboard shortcuts.
     */
    removeSecurityRestrictions(): void {
        if (environment.partner.partnerCode.toUpperCase() === 'P10002') {
            document.removeEventListener('contextmenu', this.contextMenuHandler);
            document.removeEventListener('keydown', this.keydownHandler);
        }
    }
}