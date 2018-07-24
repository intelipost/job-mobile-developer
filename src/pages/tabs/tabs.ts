import { Component } from '@angular/core';

import { LocalizacaoPage } from '../localizacao/localizacao';
import { NoticiasPage } from '../noticias/noticias';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NoticiasPage;
  tab2Root = LocalizacaoPage;

  constructor() {

  }
}
