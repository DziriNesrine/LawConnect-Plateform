import { Renderer2, Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {

    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = '../../assets/js/scroll.min.js';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s);


  }

}
