import { CSSResultGroup, LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/components/split-panel/split-panel.js';
import pageRendererCss from './page-renderer.css';

@customElement('page-renderer')
export class PageRendererComponent extends LitElement {

  static styles?: CSSResultGroup | undefined = [pageRendererCss] 

  @property()
  renderedHtml = html``;


  render() {
    return html`
  
      <div>
      ${this.renderedHtml}
      </div>

    `
  }



 
}
