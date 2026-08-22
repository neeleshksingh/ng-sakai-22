import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
    selector: 'apbutton pButton -demo',
    standalone: true,
    imports: [ButtonModule, ButtonGroupModule, SplitButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Default</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  label="Submit"></button>
                    <button pButton  label="Disabled" [disabled]="true"></button>
                    <button pButton  label="Link" class="button pButton -link"> </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Severities</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  label="Primary"> </button>
                    <button pButton  label="Secondary" severity="secondary"> </button>
                    <button pButton  label="Success" severity="success"> </button>
                    <button pButton  label="Info" severity="info"> </button>
                    <button pButton  label="Warn" severity="warn"> </button>
                    <button pButton  label="Help" severity="help"> </button>
                    <button pButton  label="Danger" severity="danger"> </button>
                    <button pButton  label="Contrast" severity="contrast"> </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Text</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  label="Primary" text> </button>
                    <button pButton  label="Secondary" severity="secondary" text> </button>
                    <button pButton  label="Success" severity="success" text> </button>
                    <button pButton  label="Info" severity="info" text> </button>
                    <button pButton  label="Warn" severity="warn" text> </button>
                    <button pButton  label="Help" severity="help" text> </button>
                    <button pButton  label="Danger" severity="danger" text> </button>
                    <button pButton  label="Plain" text> </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Outlined</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  label="Primary" outlined> </button>
                    <button pButton  label="Secondary" severity="secondary" outlined> </button>
                    <button pButton  label="Success" severity="success" outlined> </button>
                    <button pButton  label="Info" severity="info" outlined> </button>
                    <button pButton  label="warn" severity="warn" outlined> </button>
                    <button pButton  label="Help" severity="help" outlined> </button>
                    <button pButton  label="Danger" severity="danger" outlined> </button>
                    <button pButton  label="Contrast" severity="contrast" outlined> </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Group</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton group>
                        <button pButton  label="Save" icon="pi pi-check"> </button>
                        <button pButton  label="Delete" icon="pi pi-trash"> </button>
                        <button pButton  label="Cancel" icon="pi pi-times"> </button>
                    </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">SplitButton</div>
                <div class="flex flex-wrap gap-2">
                    <p-splitbutton label="Save" [model]="items"></p-splitbutton>
                    <p-splitbutton label="Save" [model]="items" severity="secondary"></p-splitbutton>
                    <p-splitbutton label="Save" [model]="items" severity="success"></p-splitbutton>
                    <p-splitbutton label="Save" [model]="items" severity="info"></p-splitbutton>
                    <p-splitbutton label="Save" [model]="items" severity="warn"></p-splitbutton>
                    <p-splitbutton label="Save" [model]="items" severity="help"></p-splitbutton>
                    <p-splitbutton label="Save" [model]="items" severity="danger"></p-splitbutton>
                    <p-splitbutton label="Save" [model]="items" severity="contrast"></p-splitbutton>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Templating</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton >
                        <img alt="logo" src="https://primefaces.org/cdn/primeng/images/logo.svg" style="width: 1.5rem" />
                    </button>
                    <button pButton  outlined severity="success">
                        <img alt="logo" src="https://primefaces.org/cdn/primeng/images/logo.svg" style="width: 1.5rem" />
                        <span class="text-bold">PrimeNG</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Icons</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  icon="pi pi-bookmark"></button>
                    <button pButton  label="Bookmark" icon="pi pi-bookmark"></button>
                    <button pButton  label="Bookmark" icon="pi pi-bookmark" iconPos="right"></button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Raised</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  label="Primary" raised> </button>
                    <button pButton  label="Secondary" severity="secondary" raised> </button>
                    <button pButton  label="Success" severity="success" raised> </button>
                    <button pButton  label="Info" severity="info" raised> </button>
                    <button pButton  label="Warn" severity="warn" raised> </button>
                    <button pButton  label="Help" severity="help" raised> </button>
                    <button pButton  label="Danger" severity="danger" raised> </button>
                    <button pButton  label="Contrast" severity="contrast" raised> </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Rounded</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  label="Primary" rounded> </button>
                    <button pButton  label="Secondary" severity="secondary" rounded> </button>
                    <button pButton  label="Success" severity="success" rounded> </button>
                    <button pButton  label="Info" severity="info" rounded> </button>
                    <button pButton  label="Warn" severity="warn" rounded> </button>
                    <button pButton  label="Help" severity="help" rounded> </button>
                    <button pButton  label="Danger" severity="danger" rounded> </button>
                    <button pButton  label="Contrast" severity="contrast" rounded> </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Rounded Icons</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  icon="pi pi-check" rounded > </button>
                    <button pButton  icon="pi pi-bookmark" severity="secondary" rounded> </button>
                    <button pButton  icon="pi pi-search" severity="success" rounded> </button>
                    <button pButton  icon="pi pi-user" severity="info" rounded> </button>
                    <button pButton  icon="pi pi-bell" severity="warn" rounded> </button>
                    <button pButton  icon="pi pi-heart" severity="help" rounded> </button>
                    <button pButton  icon="pi pi-times" severity="danger" rounded> </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Rounded Text</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  icon="pi pi-check" text raised rounded> </button>
                    <button pButton  icon="pi pi-bookmark" severity="secondary" text raised rounded> </button>
                    <button pButton  icon="pi pi-search" severity="success" text raised rounded> </button>
                    <button pButton  icon="pi pi-user" severity="info" text raised rounded> </button>
                    <button pButton  icon="pi pi-bell" severity="warn" text raised rounded> </button>
                    <button pButton  icon="pi pi-heart" severity="help" text raised rounded> </button>
                    <button pButton  icon="pi pi-times" severity="danger" text raised rounded> </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Rounded Outlined</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  icon="pi pi-check" rounded outlined> </button>
                    <button pButton  icon="pi pi-bookmark" severity="secondary" rounded outlined> </button>
                    <button pButton  icon="pi pi-search" severity="success" rounded outlined> </button>
                    <button pButton  icon="pi pi-user" severity="info" rounded outlined> </button>
                    <button pButton  icon="pi pi-bell" severity="warn" rounded outlined> </button>
                    <button pButton  icon="pi pi-heart" severity="help" rounded outlined> </button>
                    <button pButton  icon="pi pi-times" severity="danger" rounded outlined> </button>
                </div>
            </div>
            <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Loading</div>
                <div class="flex flex-wrap gap-2">
                    <button pButton  label="Search" icon="pi pi-search" [loading]="loading[0]" (click)="load(0)"> </button>
                    <button pButton  label="Search" icon="pi pi-search" iconPos="right" [loading]="loading[1]" (click)="load(1)"> </button>
                    <button pButton  styleClass="h-full" icon="pi pi-search" [loading]="loading[2]" (click)="load(2)"> </button>
                    <button pButton  label="Search" [loading]="loading[3]" (click)="load(3)"> </button>
                </div>
            </div>
        </div>
    </div> `
})
export class ButtonDemo implements OnInit {
    items: MenuItem[] = [];

    loading = [false, false, false, false];

    ngOnInit() {
        this.items = [{ label: 'Update', icon: 'pi pi-refresh' }, { label: 'Delete', icon: 'pi pi-times' }, { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' }, { separator: true }, { label: 'Setup', icon: 'pi pi-cog' }];
    }

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => (this.loading[index] = false), 1000);
    }
}
