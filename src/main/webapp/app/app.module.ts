import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MovieDbServiceSharedModule } from 'app/shared/shared.module';
import { MovieDbServiceCoreModule } from 'app/core/core.module';
import { MovieDbServiceAppRoutingModule } from './app-routing.module';
import { MovieDbServiceHomeModule } from './home/home.module';
import { MovieDbServiceEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    MovieDbServiceSharedModule,
    MovieDbServiceCoreModule,
    MovieDbServiceHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MovieDbServiceEntityModule,
    MovieDbServiceAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class MovieDbServiceAppModule {}
