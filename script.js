let rusKeys = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079,
        1093, 1098, 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 92, 93, 1103, 1095, 1089, 1084, 1080,
        1090, 1100, 1073, 1102, 46];



// document.onkeypress = function (event) {
//         // rusKeys.push(event.charCode);
//         console.log(event.code);
// }

function init () {
        let out = '';
        for (let i = 0; i < 14; i++) {
                if ( i == 0) {
                        out += `<div class = "key-area"><div class = "func-keys"><div class = "key func-key esc" id = "f-${i}">esc</div>`;
                }
                else if ( i == 13 ) {
                        out += `<div class = "key func-key" id = "f-${i}"></div></div>`;
                }
                else {
                        out += `<div class = "key func-key" id = "f-${i}">F${i}</div>`;
                }
        };
        for (let i = 0; i < 65; i++) {
                switch (i) {
                        case 0: {
                                out += `<div class = "row1"><div class ="key" onClick = soundClickKey()></div>`;
                                break;
                        }
                        case 13: {
                                out += `<div class = "key backspace"></div></div>`;
                                break;
                        }
                        case 14: {
                                out += `<div class = "doubleRow"><div class = "row2-3"><div class = "row2"><div class = "key tab"></div>`;
                                break;
                        }
                        case 27: {
                                out += `</div><div class = "row3"><div class = "key caps"></div>`;
                                break;
                        }
                        case 40: {
                                out += `</div></div><div class = "key enter"></div></div>`;
                                break;
                        }
                        case 41: {
                                out += `<div class = "row4"><div class = "key lshift"></div>`;
                                break;
                        }
                        case 53: {
                                out += `<div class ="key rshift"></div></div>`;
                                break;
                        }
                        case 54: {
                                out += `<div class = "row5"><div class = "key fn">fn</div>`;
                                break;
                        }
                        case 55: {
                                out += `<div class = "key ctrl">control</div>`;
                                break;
                        }
                        case 56: 
                        case 60: {
                                out += `<div class = "key opt">option</div>`;
                                break;
                        }
                        case 57: 
                        case 59: {
                                out += `<div class ="key cmd">command</div>`;
                                break;
                        }
                        case 58: {
                                out += `<div class ="key space" onClick = soundClickSpace()></div>`;
                                break;
                        }
                        case 61: {
                                out += `<div class ="key left-arrow" onClick = soundClickSpace()></div>`;
                                break;
                        }
                        case 62: {
                                out += `<div class ="arrows up-arrow"><div class ="key arrow"></div>`;
                                break;
                        }
                        case 63: {
                                out += `<div class ="key arrow"></div></div>`;
                                break;
                        }
                        case 64: {
                                out += `<div class ="key right-arrow"></div></div></div>`;
                                break;
                        }
                        default: {
                                out += `<div class ="key" onClick = soundClickKey()></div>`;
                        }
                        
                }
                // out += `<div class ="key" onClick = soundClickKey()> ${String.fromCharCode(rusKeys[i])} </div>`;
                // out += `<div class ="key" onClick = soundClickKey()>${i} </div>`;
        }
        out += '<div class = "naturalization"><div class ="touchpad"></div><div class = "opener"></div></div>';
        document.querySelector('#keyboard').innerHTML = out;
}
// function init () {
//         let out = ''
// }

init();

function soundClickKey() {
        let audio = new Audio(); 
        audio.src = './assets/keypress.mp3';
        audio.autoplay = true; 
}
function soundClickSpace() {
        let audio = new Audio(); 
        audio.src = './assets/keyspace.mp3';
        audio.autoplay = true; 
}