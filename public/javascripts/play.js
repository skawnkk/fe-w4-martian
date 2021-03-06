import { makeCommunicator } from "./communicator.js";
import { _ } from "./util.js";
import { receiveMsg } from "./msg.receive.js";
import { printMsgToSend, controllSendBtn, controllInputBox } from "./msg.send.js";
import { aschiMessageToHexa } from "./asci.js";

let receivedMsgArr = aschiMessageToHexa();
const receivedMsgArea = _.$('.hexa_result');
const sendBtn = _.$('.send_btn');
const translateSendMsgArea = _.$('.send_message .paste_area');
const msgInputArea = _.$('.msg_input');

function init() {
   makeCommunicator();
   receiveMsg(receivedMsgArr, receivedMsgArea);
   printMsgToSend(translateSendMsgArea);
   controllSendBtn(sendBtn, msgInputArea, translateSendMsgArea);
   controllInputBox(msgInputArea)
}

init();