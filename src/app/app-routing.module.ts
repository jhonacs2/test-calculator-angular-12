import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CalculatorViewComponent} from "./calculator/components/calculator-view/calculator-view.component";

const routes: Routes = [
  {
    path: 'calculator',
    component: CalculatorViewComponent
  },
  {
    path: '**',
    redirectTo: 'calculator'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
