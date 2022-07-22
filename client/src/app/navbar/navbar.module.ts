import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NameFilterComponent } from './name-filter/name-filter.component';
import { YearFilterComponent } from './year-filter/year-filter.component';
import { DevelopfilterComponent } from './developfilter/developfilter.component';
import { YearOrderComponent } from './year-order/year-order.component';
import { ConsoleOrderComponent } from './console-order/console-order.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    SearchBarComponent,
    NameFilterComponent,
    YearFilterComponent,
    DevelopfilterComponent,
    YearOrderComponent,
    ConsoleOrderComponent,
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NavbarModule { }
