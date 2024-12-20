import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogError, Metadata } from '@memberjunction/core';
import { MJEventType, MJGlobal } from '@memberjunction/global';
import { setupGraphQLClient, GraphQLProviderConfigData } from '@memberjunction/graphql-dataprovider';
import { LoadGeneratedEntities } from 'mj_generatedentities'
import { environment } from '../environments/environment';
import { SharedService } from './shared-service';
import { NotificationService } from "@progress/kendo-angular-notification";
import { lastValueFrom } from 'rxjs';

import { ViewEncapsulation } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { SVGIcon, bellIcon, calendarIcon, envelopeLinkIcon, inboxIcon, menuIcon, starOutlineIcon } from '@progress/kendo-svg-icons';


LoadGeneratedEntities(); // forces the generated entities library to load up, sometimes tree shaking in the build process can break this, so this is a workaround that ensures it always happens
export type RefreshTokenFunction = () => Promise<string>;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = environment.APP_TITLE

  constructor(private router: Router, @Inject(DOCUMENT) public document: Document, public auth: AuthService, private sharedService: SharedService, private notificationService: NotificationService) { 
  }

  ngOnInit(): void {
    this.setupAuth();
  }

  public doSignUp() {
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }

  
  async handleLogin(token: string, claims: any) {
    if (token) {
      const url: string = environment.GRAPHQL_URI;
      const wsurl: string = environment.GRAPHQL_WS_URI;
 
      try {
        const start = new Date();
        const refreshTokenFunction: RefreshTokenFunction = async () => {return 'NoToken'}
        const config = new GraphQLProviderConfigData(token, url, wsurl, refreshTokenFunction)
        await setupGraphQLClient(config);
        const end = new Date();
        const elapsed = (end.getTime() - start.getTime()) / 1000;
        console.log(`setupGraphQLClient() took ${elapsed} seconds`);

        // Check to see if the user has access... 
        const md = new Metadata();
        // if (!md.CurrentUser)
        //   this.doAccessDenied();
        // else {
          this.sharedService.AccessDenied = false; // turn this flag to false when we have a successful login

          // now do the data setup for the app
          const setupStart = new Date();
          await this.sharedService.doSetup();
          const setupEnd = new Date();
          const setupElapsed = (setupEnd.getTime() - setupStart.getTime()) / 1000;
          console.log(`setupService.doSetup() took ${setupElapsed} seconds`);
        // }
      } 
      catch (err) {
        LogError(err);
        this.doAccessDenied(err);
      }
    }
  }

  private async doAccessDenied(err: any = null) {
    if (err) {
      const retryKey = 'auth-retry-dt';
      const lastRetryDateTime = localStorage.getItem(retryKey);
      const hourBefore = +new Date(Date.now() - 60 * 60 * 1000);
      const retriedRecently = lastRetryDateTime && +new Date(lastRetryDateTime) > hourBefore;
      const expiryError =  (err as any)?.response?.errors?.[0]?.message.includes('Access denied');
      
      if (!retriedRecently && expiryError) {
        LogError('JWT Expired, retrying once: ' + err);
        localStorage.setItem(retryKey, new Date().toISOString());
        const login$ = this.auth.loginWithRedirect();
        await lastValueFrom(login$);
      } else {
        this.sharedService.AccessDenied = true;
        this.sharedService.DisplayNotification(err, 'error');
        this.router.navigate(['/no-access']);
      }
    } else {
      this.sharedService.AccessDenied = true;
      this.sharedService.DisplayNotification("You don't have access to the application, contact us for help.", 'error');
      this.router.navigate(['/no-access']);
    }
    
  }

  private _Authenticated: boolean = false;
  public IsAuthenticated(): boolean {
    return this._Authenticated;
  }

  async setupAuth() { 
    this.auth.user$.subscribe(
      (profile) => {
        if (profile) {
          console.log('User profile is available', profile);

          this.auth.idTokenClaims$.subscribe(
            (claims) => {
              if (claims && claims.__raw) {
                this.handleLogin(claims?.__raw, claims)
              }
            }
          );
        } else {
          console.log('User profile is not available');
        }
      }
    );   
  }
}
