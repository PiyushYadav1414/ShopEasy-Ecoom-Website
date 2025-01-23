import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material-ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ComponentsModule } from './components/components.module';  // Import ComponentsModule to use its components
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { TokenHttpInterceptor } from './core/token-http-interceptor';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    ComponentsModule,  // Import ComponentsModule to access all its exported components
    HttpClientModule,
    RouterLink,
    MatSelectModule,
    MatButtonToggleModule
    
  ],
//In app.module.ts, we import and register egister it with Angular's HTTP_INTERCEPTORS so that Angular can use this function for all outgoing HTTP requests.
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenHttpInterceptor, multi: true },], // Spread the providers from appConfig
  bootstrap: [AppComponent]
})
export class AppModule { }
