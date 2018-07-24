import { NgModule } from '@angular/core';
import { ValorData, ValorHora } from './timestamp/timestamp';
@NgModule({
	declarations: [ValorData, ValorHora],
	imports: [],
	exports: [ValorData, ValorHora]
})
export class PipesModule {}
