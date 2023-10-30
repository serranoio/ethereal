export const localhost = "localhost:3000";
const url = "ws://" + localhost + "/ws";
export const ws = new WebSocket(url);

// const urlJS = "ws://" + localhost + "/ws-js";
// export const wsJS = new WebSocket(urlJS);

export interface WSDelivery {
    state: string[],
    type: number,
}

export enum WSType {
    HTML = 0,
    JS = 1,
}