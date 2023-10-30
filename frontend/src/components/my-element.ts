import { CSSResultGroup, LitElement, TemplateResult, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/components/split-panel/split-panel.js';
import mainCss from './main.css';
import "./html-editor/html-editor.component"
import "./page-renderer/page-renderer-component";
import "./js-editor/js-editor.component"
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { WSDelivery, WSType, ws } from '../util/ws';

@customElement('main-component')
export class MainComponent extends LitElement {

  static styles?: CSSResultGroup | undefined = [mainCss] 

  @property()
  renderedHtml: TemplateResult = html``;

  @property()
  renderedJS: string = `console.log("Hello, World!")`;

  insertMessage(message: any) {
    this.renderedHtml = html`${unsafeHTML(message.state)}`
  }

  insertJS(message: any) {
    this.renderedJS = message.state;
  }

  // what we need to do, is handle the ws.onmessag
  // in main
  // then we need to send them to the components
  onMessage(msg: any) {

    const message: WSDelivery = JSON.parse(msg.data);

    console.log("message:", message)
    
    if (message.type === WSType.HTML) {
      this.insertMessage(message)
    } else if (message.type === WSType.JS) {
      this.insertJS(message)
    }

  }

  protected firstUpdated() {
    ws.onmessage = this.onMessage.bind(this)
    
  }

  constructor() {
    super(); 



  }

  render() {
    return html`

    
    <sl-split-panel>

      <page-renderer
        slot="start"
        class="html-renderer"
        .renderedHtml=${this.renderedHtml}
        style="--divider-width: 20px; height: 100vh;  display: flex; align-items: center; justify-content: center; overflow: hidden"
      >
        Start
      </page-renderer>

    <div slot="end">
      <sl-split-panel vertical style="height: 100%;">
        <html-editor
          slot="start"
          class="html-editor"
          style="height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden"
        >
          
        </html-editor>
        <js-editor
          slot="end"
          .state=${this.renderedJS}
          class="js-editor"
          style="height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden"
        >
          Bottom
        </js-editor>
      </sl-split-panel>
    </div>
  </sl-split-panel>

    `
  }



 
}
