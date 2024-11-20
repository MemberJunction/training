import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';

import { HelloMJComponent } from './hello-mj/hello-mj.component';
import { MJListenerDemo } from './listener-demo/listener-demo.component';
import { EntityListDemoComponent } from './entity-list-demo/entity-list-demo.component';
import { EntityDetailDemoComponent } from './entity-detail-demo/entity-detail-demo.component';
import { GraphQLProviderConfigData, setupGraphQLClient } from '@memberjunction/graphql-dataprovider';
import { Metadata } from '@memberjunction/core';


@NgModule({
  declarations: [
    HelloMJComponent,
    MJListenerDemo,
    EntityListDemoComponent,
    EntityDetailDemoComponent
  ],
   imports: [
     BrowserModule,
     BrowserAnimationsModule,
  ],
  providers: []//,
  //entryComponents: [HelloWorldComponent, Component2Component, UserViewGridComponent]
})
export class AppModule { 
  constructor(injector: Injector) {
    const helloMJ = createCustomElement(HelloMJComponent, {injector: injector});
    customElements.define('mj-hello-world', helloMJ);

    const listenerDemo = createCustomElement(MJListenerDemo, {injector: injector});
    customElements.define('mj-listener-demo', listenerDemo);

    const entityListDemo = createCustomElement(EntityListDemoComponent, {injector: injector});
    customElements.define('mj-entity-list-demo', entityListDemo);

    const entityDetailDemo = createCustomElement(EntityDetailDemoComponent, {injector: injector});
    customElements.define('mj-entity-detail-demo', entityDetailDemo);
  }
  ngDoBootstrap() {}
}

export async function MJ_GraphQLSetup(token: string, url: string, wsurl: string, refreshTokenFunction: any, schemaName: string, forceRefesh: boolean) {
  if (!Metadata.Provider || forceRefesh) {
    const graphQLConfig = new GraphQLProviderConfigData(token, url, wsurl, refreshTokenFunction, schemaName);
    return setupGraphQLClient(graphQLConfig);
  }
  else
    return Promise.resolve();
}
window["MJ_GraphQLSetup"] = MJ_GraphQLSetup;
