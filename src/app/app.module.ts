import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalculatorViewComponent } from './calculator/components/calculator-view/calculator-view.component';
import { CalculatorButtonComponent } from './calculator/components/calculator-button/calculator-button.component';
import { CalculatorComponent } from './calculator/components/calculator/calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorViewComponent,
    CalculatorButtonComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
