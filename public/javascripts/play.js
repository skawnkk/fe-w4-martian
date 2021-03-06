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
//입력 => 입력한 값을 전송하여 화살표로 가리켜준 다음 다시 출력하기.
//화살표 다 돌려주고 나서 전송완료 alert -> 페이지 초기화.
//질문=> receive : msgArrToStr (동일한 파라미터를 인지하지 못하는 이유.)