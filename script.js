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
let capsPress = document.getElementById('CapsLock').classList == 'key caps sistem active';


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
                // if ((event.code == 'AltLeft' && event.ctrlKey) || (event.code == 'ControlLeft' && event.altKey))  {
                //         console.log('Change!');
                //         currentLang[48] == 'ru' ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                //         localStorage.setItem('currentLang', currentLang[48]);
                //         alphabetRender(currentLang);
                // }

                let pressLeftOption = document.getElementById('AltLeft').className == 'key opt sistem active';
                let pressLeftControl = document.getElementById('ControlLeft').className == 'key ctrl sistem active';
                
                // if (event.code == 'ControlLeft' && pressLeftOption)  {
                //         console.log('Change!');
                //         currentLang[48] == 'ru' ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                //         localStorage.setItem('currentLang', currentLang[48]);
                //         alphabetRender(currentLang);
                // }

                // if (event.code == 'AltLeft' && pressLeftControl)  {
                //         console.log('Change!');
                //         currentLang[48] == 'ru' ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                //         localStorage.setItem('currentLang', currentLang[48]);
                //         alphabetRender(currentLang);
                // }

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
                        case 17:
                                console.log('pressLeftControl ', pressLeftControl);
                                console.log('capsPress: ', capsPress);
                                console.log('pressLeftOption: ', pressLeftOption);

                                document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');

                                if (currentLang[48] == 'ru' &&  (capsPress || pressLeftOption)) {
                                        console.log("РУ, Будем менять язык");
                                        currentLang = enKeyCodes;
                                } else if (currentLang[48] == 'en' &&  (capsPress || pressLeftOption)) {
                                        console.log("ЕН, Будем менять язык");
                                        currentLang = rusKeyCodes;
                                }
                                alphabetRender(currentLang);
                                break;
                        case 18:
                                console.log('LeftControl ', pressLeftControl);
                                console.log('caps: ', capsPress);
                                console.log('event.ctrlKey: ', event.ctrlKey);
                                console.log(event.ctrlKey || pressLeftControl);
                                
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
                        // event.target.classList.add('active');
                        let keyValue = event.target.classList.value;
                        if (keyValue == 'key change active' || keyValue == 'key space sistem active') {
                                let letter = event.target.getAttribute('data');
                                textarea.focus();
                                textarea.value += letter;
                                textarea.focus();
                        } ;
                        if (keyValue == 'key left-arrow sistem active' || keyValue == 'key arrow sistem active' || keyValue == 'key right-arrow sistem active') {
                                console.log(keyValue);
                                let letter = event.target.getAttribute('data');
                                textarea.focus();
                                textarea.value += letter;
                                textarea.focus();
                        } 
                        console.log(event.target.getAttribute('data'));
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
                                        // currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                                        localStorage.setItem('currentLang', currentLang);
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
                                        // currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                                        localStorage.setItem('currentLang', currentLang);
                                        alphabetRender(currentLang);
                                        // currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                                        // alphabetRender(currentLang);
                                        break;
                                case 'AltLeft':
                                case 'AltRight':
                                        event.target.classList.add('active');
                                        if (currentLang[48] == 'en' && document.getElementById('ControlLeft').classList.value != 'key ctrl sistem active') {
                                                console.log(1);
                                                currentLang = optEnKeyCodes;
                                        } else if (currentLang[48] == 'ru' && document.getElementById('ControlLeft').classList.value != 'key ctrl sistem active') {
                                                console.log(2);
                                                currentLang = optRusKeyCodes;
                                        } else if (currentLang[48] == 'en' && document.getElementById('ControlLeft').classList.value == 'key ctrl sistem active') {
                                                console.log(3);
                                                currentLang = rusKeyCodes;
                                        } else if (currentLang[48] == 'ru'&& document.getElementById('ControlLeft').classList.value == 'key ctrl sistem active') {
                                                console.log(4);
                                                currentLang = enKeyCodes;
                                        }
                                        // currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                                        localStorage.setItem('currentLang', currentLang);
                                        alphabetRender(currentLang);
                                        break;
                                case 'onOff':
                                        document.getElementById('screen').classList.toggle('hidden');
                                        document.getElementById('black-screen').classList.toggle('hidden');
                                        break;
                        }
                });
                element.addEventListener('mouseup', function(event) {
                        // let capsPress = document.getElementById('CapsLock').classList == 'key caps sistem active';
                        let currentKey = event.target.getAttribute('data');     

                        if (currentKey !== 'CapsLock') {
                                event.target.classList.remove('active');
                                if (!capsPress) {
                                        currentLang[48] == 'en' ? currentLang = enKeyCodes : false;
                                        currentLang[48] == 'ru' ? currentLang = rusKeyCodes : false;
                                        alphabetRender(currentLang);
                                        localStorage.setItem('currentLang', currentLang);
                                }
                        }

                        if (currentKey == 'ShiftLeft' || currentKey == 'ShiftRight' || currentKey == 'AltLeft' || currentKey == 'AltRight') {
                                if (currentLang[48] == 'en') {
                                        capsPress ?  currentLang = capsEnKeyCodes : currentLang = enKeyCodes;
                                } else if (currentLang[48] == 'ru') {
                                        capsPress ? currentLang = capsRusKeyCodes : rusKeyCodes;
                                }
                                localStorage.setItem('currentLang', currentLang);
                                alphabetRender(currentLang);
                        }
                        // if (currentKey == 'AltLeft' || currentKey == 'AltRight') {
                        //         if (currentLang[48] == 'en') {
                        //                 capsPress ?  currentLang = capsEnKeyCodes : currentLang = enKeyCodes;
                        //         } else if (currentLang[48] == 'ru') {
                        //                 capsPress ? currentLang = capsRusKeyCodes : rusKeyCodes;
                        //         }
                        //         localStorage.setItem('currentLang', currentLang);
                        //         alphabetRender(currentLang);
                        // }
                        
                });
        });
}

keyHandler();
mouseKeyHandler();
