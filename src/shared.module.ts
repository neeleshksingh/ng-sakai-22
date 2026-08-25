import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AccordionModule } from 'primeng/accordion';
import { AlertDialogComponent } from './app/global/components/alert-dialog/alert-dialog.component';
// import { AnimateModule } from 'primeng/animate';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
// import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
// import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
// import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
// import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
// import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
// import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
// import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
// import { TabMenuModule } from 'primeng/tabmenu';
// import { TabViewModule } from 'primeng/tabview';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
// import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SpeedDialModule } from 'primeng/speeddial';

import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
// import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { GenericManageComponent } from './app/global/components/generic-components/generic-manage/generic-manage.component';
import { GenericTableComponent } from './app/global/components/generic-components/generic-table/generic-table.component';
import { GenericViewComponent } from './app/global/components/generic-components/generic-view/generic-view.component';
import { BarGraphSkeletonComponent } from './app/global/components/skeletons/bar-graph-skeleton/bar-graph-skeleton.component';
import { DashboardCardsSkeletonComponent } from './app/global/components/skeletons/dashboard-cards-skeleton/dashboard-cards-skeleton.component';
import { DashboardListSkeletonComponent } from './app/global/components/skeletons/dashboard-list-skeleton/dashboard-list-skeleton.component';
import { AddRowOVSMDirective } from './app/shared/directives/add-rowovsm.directive';
import { AddRowOVSMSMDirective } from './app/shared/directives/add-rowovsmsm.directive';
import { HasPermissionPipe } from './app/shared/pipes/has-permission.pipe';
import { ReduceDuplicatesSelectItemPipe } from './app/shared/pipes/reduce-duplicates-select-item.pipe';
import { SafePipe } from './app/shared/pipes/safe.pipe';
import { GlobalCurrencyPipe } from './app/shared/pipes/global-currency.pipe';
import { UnderProgressComponent } from './app/global/components/exception-pages/under-progress/under-progress.component';
import { SelectModule } from 'primeng/select';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
    imports: [
        CommonModule,
        AnimateOnScrollModule,
        // AnimateModule,
        FormsModule,
        RouterModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarGroupModule,
        AvatarModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        // CalendarModule,
        DatePickerModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        // ChipsModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        SelectModule,
        FieldsetModule,
        FileUploadModule,
        FloatLabelModule,
        GalleriaModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        // InputSwitchModule,
        InputTextModule,
        // InputTextareaModule,
        KnobModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        // MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        // OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        // SlideMenuModule,
        SliderModule,
        SpeedDialModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabsModule,
        // TabMenuModule,
        // TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        // VirtualScrollerModule,
        DynamicDialogModule,
        ReactiveFormsModule,
        ProgressSpinnerModule,
        FullCalendarModule,
        EditorModule,
        // TriStateCheckboxModule,
        InputGroupModule,
        InputGroupAddonModule,
        DataViewModule,
        SafePipe,
        ReduceDuplicatesSelectItemPipe,
        HasPermissionPipe,
        GlobalCurrencyPipe,


        //Components
        GenericTableComponent,
        GenericViewComponent,
        BarGraphSkeletonComponent,
        DashboardCardsSkeletonComponent,
        DashboardListSkeletonComponent,
        UnderProgressComponent,
        GenericManageComponent,
        AlertDialogComponent,
        //Custome Modules

        // DirevtivesModule
        AddRowOVSMDirective,
        AddRowOVSMSMDirective,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })
    ],
    providers: [
        DatePipe,
        MessageService,
        ConfirmationService
    ],
    exports: [
        CommonModule,
        FormsModule,
        AnimateOnScrollModule,
        // AnimateModule,
        RouterModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarGroupModule,
        AvatarModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        // CalendarModule,
        DatePickerModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        // ChipsModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        SelectModule,
        FieldsetModule,
        FileUploadModule,
        FloatLabelModule,
        GalleriaModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        // InputSwitchModule,
        InputTextModule,
        // InputTextareaModule,
        KnobModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        // MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        // OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        // SlideMenuModule,
        SliderModule,
        SpeedDialModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabsModule,
        // TabMenuModule,
        // TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        // VirtualScrollerModule,
        DynamicDialogModule,
        ReactiveFormsModule,
        ProgressSpinnerModule,
        FullCalendarModule,
        EditorModule,
        // TriStateCheckboxModule,
        InputGroupModule,
        InputGroupAddonModule,
        DataViewModule,

        //Components
        GenericTableComponent,
        GenericViewComponent,
        BarGraphSkeletonComponent,
        DashboardCardsSkeletonComponent,
        DashboardListSkeletonComponent,
        UnderProgressComponent,
        GenericManageComponent,
        //Custome Modules
        AddRowOVSMDirective,
        AlertDialogComponent,
        AddRowOVSMSMDirective,

        //pipes
        SafePipe,
        ReduceDuplicatesSelectItemPipe,
        HasPermissionPipe,
        GlobalCurrencyPipe,
        NgxEchartsModule
    ]
})
export class SharedModule { }
