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

let keyNums = document.querySelectorAll('.change');
let textarea =  document.getElementById('textarea');
textarea.value = '';
let capsPress = document.getElementById('CapsLock').classList == 'key caps sistem active';


let alphabetRender = function (lang) {
        for (let i = 0; i < 48; i++) {
                keyNums[i].innerHTML = String.fromCharCode(lang[i]);
                keyNums[i].setAttribute('data', String.fromCharCode(lang[i]));
                keyNums[i].setAttribute('id', keyCodes[i]);
        }
}
alphabetRender(currentLang);

let keyHandler = function() {
        document.addEventListener('keydown', function(event) {
                event.preventDefault();

                let pressLeftOption = document.getElementById('AltLeft').className == 'key opt sistem active';
                let pressLeftControl = document.getElementById('ControlLeft').className == 'key ctrl sistem active';
                

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
                        case 17:
                                document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');

                                if (currentLang[48] == 'ru' &&  (capsPress || pressLeftOption)) {
                                        currentLang = enKeyCodes;
                                } else if (currentLang[48] == 'en' &&  (capsPress || pressLeftOption)) {
                                        currentLang = rusKeyCodes;
                                }
                                alphabetRender(currentLang);
                                break;
                        case 18:   
                                document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
                                if (currentLang[48] == 'en' &&  !event.ctrlKey && !pressLeftControl) {
                                        currentLang = optEnKeyCodes;
                                } else if (currentLang[48] == 'ru' &&  !event.ctrlKey && !pressLeftControl) {
                                        currentLang = optRusKeyCodes;
                                } else if (currentLang[48] == 'ru' &&  (event.ctrlKey || pressLeftControl)) {
                                        currentLang = enKeyCodes;
                                }
                                else if (currentLang[48] == 'en' &&  (event.ctrlKey || pressLeftControl)) {
                                        currentLang = rusKeyCodes;
                                }
                                localStorage.setItem('currentLang', currentLang[48]);
                                alphabetRender(currentLang);
                                break;
                        case 32:
                                document.querySelector(`.key[id = "${event.code}"]`).classList.add('active');
                                textarea.value += ' ';
                                break;
                        case 17:
                        case 91:
                        case 93:
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
                        if (event.target.getAttribute('data') !== 'CapsLock') {
                                event.target.classList.add('active');
                        }
                        let keyValue = event.target.classList.value;
                        if (keyValue == 'key change active' || keyValue == 'key space sistem active') {
                                let letter = event.target.getAttribute('data');
                                textarea.focus();
                                textarea.value += letter;
                                textarea.focus();
                        } ;
                        if (keyValue == 'key left-arrow sistem active' || keyValue == 'key arrow sistem active' || keyValue == 'key right-arrow sistem active') {
                                let letter = event.target.getAttribute('data');
                                textarea.focus();
                                textarea.value += letter;
                                textarea.focus();
                        } 

                        switch (event.target.getAttribute('data')) {
                                case 'Enter':
                                        textarea.value += "\n";
                                        break;
                                case 'Tab':
                                        textarea.value += "    ";
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
                                        localStorage.setItem('currentLang', currentLang[48]);
                                        alphabetRender(currentLang);
                                        break;
                                case 'ShiftLeft':
                                case 'ShiftRight':
                                        event.target.classList.add('active');
                                        if (currentLang[48] == 'en') {
                                                currentLang == capsEnKeyCodes ?  currentLang = enKeyCodes : currentLang = shiftEnKeyCodes;
                                        } else if (currentLang[48] == 'ru') {
                                                currentLang == capsRusKeyCodes ?  currentLang = rusKeyCodes : currentLang = shiftRusKeyCodes;
                                        }
                                        localStorage.setItem('currentLang', currentLang[48]);
                                        alphabetRender(currentLang);

                                        break;
                                case 'AltLeft':
                                case 'AltRight':
                                        event.target.classList.add('active');
                                        if (currentLang[48] == 'en' && document.getElementById('ControlLeft').classList.value != 'key ctrl sistem active') {
                                                currentLang = optEnKeyCodes;
                                        } else if (currentLang[48] == 'ru' && document.getElementById('ControlLeft').classList.value != 'key ctrl sistem active') {
                                                currentLang = optRusKeyCodes;
                                        } else if (currentLang[48] == 'en' && document.getElementById('ControlLeft').classList.value == 'key ctrl sistem active') {
                                                currentLang = rusKeyCodes;
                                        } else if (currentLang[48] == 'ru'&& document.getElementById('ControlLeft').classList.value == 'key ctrl sistem active') {
                                                currentLang = enKeyCodes;
                                        }
                                        localStorage.setItem('currentLang', currentLang[48]);
                                        alphabetRender(currentLang);
                                        break;
                                case 'onOff':
                                        document.getElementById('screen').classList.toggle('hidden');
                                        document.getElementById('black-screen').classList.toggle('hidden');
                                        break;
                        }
                });
                element.addEventListener('mouseup', function(event) {
                        let currentKey = event.target.getAttribute('data');     
                        if (currentKey !== 'CapsLock') {
                                event.target.classList.remove('active');
                                if (currentLang[49] != 'capsRusKeyCodes' && currentLang[49] != 'capsEnKeyCodes') {
                                        currentLang[48] == 'en' ? currentLang = enKeyCodes : false;
                                        currentLang[48] == 'ru' ? currentLang = rusKeyCodes : false;
                                        alphabetRender(currentLang);
                                        localStorage.setItem('currentLang', currentLang[48]);
                                } 
                        }

                        if (currentKey == 'ShiftLeft' || currentKey == 'ShiftRight' || currentKey == 'AltLeft' || currentKey == 'AltRight') {
                                if (currentLang[48] == 'en') {
                                        currentLang[49] != 'capsEnKeyCodes' ?  currentLang = capsEnKeyCodes : currentLang = enKeyCodes;
                                } else if (currentLang[48] == 'ru') {
                                        console.log(currentLang[49]);
                                        currentLang[49] != 'capsRusKeyCodes' ? currentLang = rusKeyCodes : currentLang = capsRusKeyCodes;
                                }
                                localStorage.setItem('currentLang', currentLang[48]);
                                alphabetRender(currentLang);
                        }
                        
                });
        });
}

keyHandler();
mouseKeyHandler();

