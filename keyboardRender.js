export default function () {
        let out = '';
        for (let i = 0; i < 14; i++) {
                if ( i == 0) {
                        out += `<div class="audio left"></div><div class = "key-area"><div class = "func-keys"><div class = "key func-key esc" id = "f-${i}">esc</div>`;
                }
                else if ( i == 13 ) {
                        out += `<div class = "key func-key" id = "onOff" data = "onOff"></div></div>`;
                }
                else {
                        out += `<div class = "key func-key" id = "f-${i}">F${i}</div>`;
                }
        };
        for (let i = 0; i < 65; i++) {
                switch (i) {
                        case 0: {
                                out += `<div class = "row1"><div class ="key change" id = "k-${i}">${i}</div>`;
                                break;
                        }
                        case 13: {
                                out += `<div class = "key sistem backspace" data = "Backspace"></div></div>`;
                                break;
                        }
                        case 14: {
                                out += `<div class = "doubleRow"><div class = "row2-3"><div class = "row2"><div class = "key tab sistem" data = "Tab"></div>`;
                                break;
                        }
                        case 27: {
                                out += `</div><div class = "row3"><div class = "key caps sistem" data = "CapsLock"><div class = "indicator"></div></div>`;
                                break;
                        }
                        case 40: {
                                out += `</div></div><div class = "key enter sistem" data = "Enter"></div></div>`;
                                break;
                        }
                        case 41: {
                                out += `<div class = "row4"><div class = "key lshift sistem" data = "ShiftLeft"></div>`;
                                break;
                        }
                        case 53: {
                                out += `<div class ="key rshift sistem" data = "ShiftRight"></div></div>`;
                                break;
                        }
                        case 54: {
                                out += `<div class = "row5"><div class = "key fn sistem">fn</div>`;
                                break;
                        }
                        case 55: {
                                out += `<div class = "key ctrl sistem" data = "ControlLeft">control</div>`;
                                break;
                        }
                        case 56: {
                                out += `<div class = "key opt sistem" data = "AltLeft">option</div>`;
                                break;
                        }
                        case 60: {
                                out += `<div class = "key opt sistem" data = "AltRight">option</div>`;
                                break;
                        }
                        case 57: {
                                out += `<div class ="key cmd sistem" data = "MetaLeft">command</div>`;
                                break;
                        }
                        case 59: {
                                out += `<div class ="key cmd sistem" data = "MetaRight">command</div>`;
                                break;
                        }
                        case 58: {
                                out += `<div class ="key space sistem" data = " "></div>`;
                                break;
                        }
                        case 61: {
                                out += `<div class ="key left-arrow sistem" data = "ArrowLeft"></div>`;
                                break;
                        }
                        case 62: {
                                out += `<div class ="arrows up-arrow"><div class ="key arrow sistem" data = "ArrowUp"></div>`;
                                break;
                        }
                        case 63: {
                                out += `<div class ="key arrow sistem" data = "ArrowDown"></div></div>`;
                                break;
                        }
                        case 64: {
                                out += `<div class ="key right-arrow sistem" data = "ArrowRight"></div></div></div><div class="audio right"></div>`;
                                break;
                        }
                        default: {
                                out += `<div class ="key change" id = "k-${i}"></div>`;
                        }
                        
                }
        }
        out += '<div class = "naturalization"><div class ="touchpad"></div><div class = "opener"></div></div>';
        document.querySelector('#keyboard').innerHTML = out;
}