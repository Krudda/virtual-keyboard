import keyboardRender from './keyboardRender.js';
import { rusKeyCodes, enKeyCodes, shiftRusKeyCodes,
        shiftEnKeyCodes, capsEnKeyCodes,  capsRusKeyCodes,
        keyCodes, optEnKeyCodes, optRusKeyCodes} from './keyCodes.js';

let currentLang;

keyboardRender();
if (!localStorage.getItem('currentLang')) {
        currentLang = enKeyCodes;
}
else {
        localStorage.getItem('currentLang') == 'en' ? currentLang = enKeyCodes : currentLang = rusKeyCodes;
}

// console.log(localStorage.getItem('currentLang').split(','));

let keyNums = document.querySelectorAll('.change');
let textarea =  document.getElementById('textarea');
textarea.value = '';

let alphabetRender = function (lang) {
        // console.log(lang[48]);
        for (let i = 0; i < 48; i++) {
                keyNums[i].innerHTML = String.fromCharCode(lang[i]);
                keyNums[i].setAttribute('data', String.fromCharCode(lang[i]));
                keyNums[i].setAttribute('id', keyCodes[i]);
        }
}
alphabetRender(currentLang);


// let enKB = [];
// document.onkeypress = function(event) {
//         enKB.push(event.code);
//         console.log(enKB);
// }


let keyHandler = function() {
        document.addEventListener('keydown', function(event) {
                event.preventDefault();
                if ((event.code == 'AltLeft' && event.ctrlKey) || (event.code == 'ControlLeft' && event.altKey))  {
                        console.log('Change!');
                        currentLang[48] == 'ru' ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                        localStorage.setItem('currentLang', currentLang[48]);
                        alphabetRender(currentLang);
                }
                console.log(event);
                console.log(event.keyCode);
                switch (event.keyCode) {
                        case 9:
                                event.returnValue = false;
                                textarea.value += '    ';
                                break;
                        case 8:
                                textarea.value = textarea.value.slice(0, -1);
                                break;
                        case 13:
                                        textarea.value += "\n";
                                        break;
                        case 20:
                                console.log(currentLang[48]);
                                document.querySelector(`.key[data = "${event.key}"]`).classList.toggle('active');
                                if (currentLang[48] == 'en') {
                                        currentLang == enKeyCodes ?  currentLang = capsEnKeyCodes :  currentLang = enKeyCodes;
                                } else if (currentLang[48] == 'ru') {
                                        currentLang == rusKeyCodes ?  currentLang = capsRusKeyCodes : currentLang = rusKeyCodes;
                                }
                                alphabetRender(currentLang);
                                localStorage.setItem('currentLang', currentLang[48]);
                                break;
                        case 16:
                                document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
                                if (currentLang[48] == 'en') {
                                        currentLang == enKeyCodes ?  currentLang = shiftEnKeyCodes :   currentLang = enKeyCodes;
                                } else if (currentLang[48] == 'ru') {
                                        currentLang == rusKeyCodes ?  currentLang = shiftRusKeyCodes :  currentLang = rusKeyCodes;
                                }
                                alphabetRender(currentLang);
                                break;
                        case 18:
                                document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
                                if (currentLang[48] == 'en' &&  !event.ctrlKey) {
                                        currentLang == enKeyCodes ?  currentLang = optEnKeyCodes : false;
                                } else if (currentLang[48] == 'ru' &&  !event.ctrlKey) {
                                        currentLang == rusKeyCodes ?  currentLang = optRusKeyCodes : false;
                                }
                                alphabetRender(currentLang);
                                break;
                        case 32:
                                document.querySelector(`.key[id = "${event.code}"]`).classList.add('active');
                                textarea.value += ' ';
                                break;
                        case 17:
                        case 91:
                        case 93:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                                document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
                                textarea.focus();
                                break;
                        default: 
                                document.querySelector(`.key[id = "${event.code}"]`).classList.add('active');
                                textarea.focus();
                                textarea.value += document.querySelector(`.key[id = "${event.code}"]`).getAttribute('data');
                                textarea.focus();
                                break;
                }
                textarea.focus(); 
        });
        document.addEventListener('keyup', function(event) {
                document.querySelectorAll(`.key`).forEach(element => {
                        if ( currentLang !== capsEnKeyCodes || currentLang !== capsRusKeyCodes) {
                                element.getAttribute('data') !== 'CapsLock' ? element.classList.remove('active') : false;
                        }
                });
                if ( event.key == 'Shift' ) {
                        if (currentLang[48] == 'en') {
                                currentLang == shiftEnKeyCodes ?  currentLang = enKeyCodes :   currentLang = capsEnKeyCodes;
                        } else if (currentLang[48] == 'ru') {
                                currentLang == shiftRusKeyCodes ?  currentLang = rusKeyCodes :  currentLang = capsRusKeyCodes;
                        }
                        localStorage.setItem('currentLang', currentLang[48]);
                        alphabetRender(currentLang);
                }
                if ( event.key == 'Alt') {
                        currentLang[48] == 'ru' ? currentLang = rusKeyCodes : currentLang = enKeyCodes;
                        alphabetRender(currentLang);
                        localStorage.setItem('currentLang', currentLang[48]);
                }
        });
}

let mouseKeyHandler = function () {
        document.querySelectorAll('.key').forEach(element => {
                element.addEventListener('mousedown', function(event) {
                        console.log(event.target.getAttribute('data'));
                        if (event.target.getAttribute('data') !== 'CapsLock') {
                                event.target.classList.add('active');
                        }
                        // event.target.classList.add('active');
                        let keyValue = event.target.classList.value;
                        if (keyValue == 'key change active' || keyValue == 'key space sistem active') {
                                let letter = event.target.getAttribute('data');
                                textarea.focus();
                                textarea.value += letter;
                                textarea.focus();
                        } 
                        switch (event.target.getAttribute('data')) {
                                case 'Enter':
                                        textarea.value += "\n";
                                        break;
                                case 'Backspace':
                                        textarea.value = textarea.value.slice(0, -1);
                                        break;
                                case 'CapsLock':
                                        event.target.classList.toggle('active');
                                        if (currentLang[48] == 'en') {
                                                currentLang == capsEnKeyCodes ?  currentLang = enKeyCodes : currentLang = capsEnKeyCodes;
                                        } else if (currentLang[48] == 'ru') {
                                                currentLang == capsRusKeyCodes ?  currentLang = rusKeyCodes : currentLang = capsRusKeyCodes;
                                        }
                                        // currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                                        localStorage.setItem('currentLang', currentLang);
                                        alphabetRender(currentLang);
                                        break;
                                case 'ShiftLeft':
                                case 'ShiftRight':
                                        event.target.classList.toggle('active');
                                        // currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                                        // alphabetRender(currentLang);
                                        break;
                                case 'onOff':
                                        document.getElementById('screen').classList.toggle('hidden');
                                        document.getElementById('black-screen').classList.toggle('hidden');
                                        break;



                        }
                        // else if (event.target.getAttribute('data') == 'Enter') {
                        //         textarea.focus();
                        //         textarea.value += "\n";
                        //         textarea.focus();
                        // }
                        // console.log(textarea.value);
                });
                element.addEventListener('mouseup', function(event) {
                        if (event.target.getAttribute('data') !== 'CapsLock') {
                                event.target.classList.remove('active');
                        }
                        // console.log(event.target);
                });
        });
}

keyHandler();
mouseKeyHandler();
