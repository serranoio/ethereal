import { css } from "lit";


export default css`


:host {

    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

#monaco-html {
    box-sizing: border-box;

    width: 100%;
    height: 100%;
    position: relative;
    background-color: #282C34;
    overflow-y: scroll;
    font-size: .6rem;
    color: green;
    
}
`;