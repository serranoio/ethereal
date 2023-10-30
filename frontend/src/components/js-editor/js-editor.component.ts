import { CSSResultGroup, LitElement, PropertyValueMap,  html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/components/split-panel/split-panel.js';
import {EditorView, keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"
import { oneDark } from '@codemirror/theme-one-dark';
import jsEditorCss from './js-editor.css';
import { javascript } from '@codemirror/lang-javascript';
import { WSType, ws } from '../../util/ws';

@customElement('js-editor')
export class JsEditorComponent extends LitElement {

  @property()
  state: string = 'console.log("hello, world")';
  
  @property()
  editor: any;

  @query('#monaco-html')
  htmlEditor: any;

  @property()
  callOnce: boolean = false;

  static styles?: CSSResultGroup | undefined = [jsEditorCss] 
  
  constructor() {
    super()
  }

  onEditorUpdate(e: any) {
  
    if (!this.callOnce && ws.readyState) {
      const message = {  
        type:  WSType.JS,
        state: this.editor.viewState.state.doc.text.join("") 
      }
      
      if (ws.readyState) {
        ws.send(JSON.stringify(message));
      }
      this.callOnce = true;
    }
}
  
  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    

    this.editor = new EditorView({
      doc: this.state,
      extensions: [keymap.of(defaultKeymap), javascript(), oneDark, EditorView.updateListener.of(this.onEditorUpdate.bind(this))],
      parent: this.htmlEditor,     
    })

  }

  render() {

    if (this.editor) {
      this.editor.dispatch({
        changes: {from: 0, to: this.editor.state.doc.length, insert: this.state}
      });
    }

    return html`
    
    <div id="monaco-html">
    
    
    </div>
   

    `
  }



 
}
