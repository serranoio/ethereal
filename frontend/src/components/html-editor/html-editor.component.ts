import { CSSResultGroup, LitElement, PropertyValueMap, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/components/split-panel/split-panel.js';
import htmlEditorCss from './html-editor.css';
import {EditorView, keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"
import { html as htmlLang } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { WSType, ws } from '../../util/ws';


@customElement('html-editor')
export class HtmlEditorComponent extends LitElement {

  @property()
  editor: any;

  @query('#monaco-html')
  htmlEditor: any;

  static styles?: CSSResultGroup | undefined = [htmlEditorCss] 


  // insertMessage(message: any) {


  //   this.editor.viewState.state.doc.text
  // }


  // onMessage(msg: any) {
  //   this.insertMessage(JSON.parse(msg.data))
  // }

  constructor() {
    super()

      
    // ws.onmessage = this.onMessage
    


  }

  onEditorUpdate(e: any) {
      const message = {
        type:  WSType.HTML,
        state: this.editor.viewState.state.doc.text.join("") 
      }
      
      if (ws.readyState) {
        ws.send(JSON.stringify(message));
      }
  }
  
  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    

    this.editor = new EditorView({
      doc: "hello",
      extensions: [keymap.of(defaultKeymap), htmlLang(), oneDark, EditorView.updateListener.of(this.onEditorUpdate.bind(this))],
      parent: this.htmlEditor,     
    })



  }

  render() {
  

    return html`
    
    <div id="monaco-html">
    
    
    </div>
   

    `
  }



 
}
