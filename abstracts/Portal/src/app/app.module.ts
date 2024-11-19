import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import 'hammerjs'
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { HeaderComponent } from './header/header.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HomeComponent } from './home/home.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { WindowModule } from "@progress/kendo-angular-dialog";
import { environment } from 'src/environments/environment';
import { NoAccessComponent } from './no-access/no-access.component';
import { NumberSuffixPipe } from './NumberSuffixPipe';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { SplitterModule } from '@progress/kendo-angular-layout';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { MenuModule } from '@progress/kendo-angular-menu';
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
import { NewSubmission } from './new-submission/new-submission.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    HeaderComponent,
    HomeComponent,
    NoAccessComponent,
    NumberSuffixPipe,
    BreadcrumbComponent,
    NewSubmission,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.CLIENT_AUTHORITY,
      clientId: environment.CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      cacheLocation: 'localstorage', 
    }),
    BrowserAnimationsModule,
    DropDownsModule,
    GridModule,
    ChartsModule,
    IndicatorsModule,
    LayoutModule,
    ButtonsModule,
    NavigationModule,
    IconsModule,
    InputsModule,
    NotificationModule,
    WindowModule,
    ListViewModule,
    PanelBarModule,
    SplitterModule,
    MenuModule,
    PDFExportModule,
  ],
  providers: [
    CurrencyPipe, 
    DecimalPipe,
    NumberSuffixPipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
}
