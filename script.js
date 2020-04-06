import keyboardRender from './keyboardRender.js';
import { rusKeyCodes, enKeyCodes, shiftRusKeyCodes, shiftEnKeyCodes, capsEnKeyCodes,  capsRusKeyCodes } from './keyCodes.js';

keyboardRender();

let keyNums = document.querySelectorAll('.change');
let textarea =  document.getElementById('textarea');
textarea.value = '';
let currentLang = enKeyCodes;

let alphabetRender = function (lang) {
        // console.log(lang[48]);
        for (let i = 0; i < 48; i++) {
                keyNums[i].innerHTML = String.fromCharCode(lang[i]);
                // keyNums[i].classList.add(`data = ${enKeyCodes[i]}`);
                keyNums[i].setAttribute('data', String.fromCharCode(lang[i]));
        }
}
alphabetRender(currentLang);
// for (let i = 0; i < 48; i++) {
//         keyNums[i].innerHTML = String.fromCharCode(currentLang[i]);
//         // keyNums[i].classList.add(`data = ${enKeyCodes[i]}`);
//         keyNums[i].setAttribute('data', String.fromCharCode(currentLang[i]));
// }

// let enKB = [];
// document.onkeypress = function(event) {
//         enKB.push(event.charCode);
//         console.log(enKB);
// }

// document.onkeypress = function(event) {
//         console.log(event);
//         console.log(event.keyCode);
// };
let keyHandler = function() {
        document.addEventListener('keydown', function(event) {
                // event.preventDefault();
                if ((event.code == 'AltLeft' && event.ctrlKey) || (event.code == 'ControlLeft' && event.altKey))  {
                        console.log('Change!');
                        currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                        alphabetRender(currentLang);
                }

                // event = event || window.event;
                // if (event.shiftKey && event.keyCode == 65) {
                //         console.log('Change!');
                // }


                console.log(event);
                console.log(event.keyCode);
                switch (event.keyCode) {
                        case 9:
                                event.returnValue = false;
                                break;
                        case 20:
                                document.querySelector(`.key[data = "${event.key}"]`).classList.add('active');
                                if (currentLang[48] == 'en') {
                                        currentLang == capsEnKeyCodes ?  currentLang = enKeyCodes : currentLang = capsEnKeyCodes;
                                } else if (currentLang[48] == 'ru') {
                                        currentLang == capsRusKeyCodes ?  currentLang = rusKeyCodes : currentLang = capsRusKeyCodes;
                                }
                                // currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                                alphabetRender(currentLang);
                                break;
                        case 16:
                        case 17:
                        case 18:
                        case 91:
                        case 93:
                        case 37:
                                document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
                                textarea.focus();
                                break;
                        default: 
                                document.querySelector(`.key[data = "${event.key}"]`).classList.add('active');
                                textarea.focus();
                                break;
                }
                // else {
                //         document.querySelector(`.key[data = "${event.key}"]`).classList.add('active');
                // }
                textarea.focus();
        });
        document.addEventListener('keyup', function(event) {
                document.querySelectorAll(`.key`).forEach(element => {
                        element.classList.remove('active');
                })
                // if (event.keyCode == 20)
        });
}

let mouseKeyHandler = function () {
        document.querySelectorAll('.key').forEach(element => {
                element.addEventListener('mousedown', function(event) {
                        // console.log(event.target.getAttribute('data'));
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
                                        let str = textarea.value.slice(0, -1);
                                        textarea.value = str;
                                        break;
                                case 'CapsLock':
                                        event.target.classList.toggle('active');
                                        if (currentLang[48] == 'en') {
                                                currentLang == capsEnKeyCodes ?  currentLang = enKeyCodes : currentLang = capsEnKeyCodes;
                                        } else if (currentLang[48] == 'ru') {
                                                currentLang == capsRusKeyCodes ?  currentLang = rusKeyCodes : currentLang = capsRusKeyCodes;
                                        }
                                        // currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                                        alphabetRender(currentLang);
                                        break;
                                case 'ShiftLeft':
                                case 'ShiftRight':
                                        event.target.classList.toggle('active');
                                        // currentLang == rusKeyCodes ?  currentLang = enKeyCodes : currentLang = rusKeyCodes;
                                        // alphabetRender(currentLang);
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
