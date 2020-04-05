import keyboardRender from './keyboardInit.js';
import { rusKeyCodes, enKeyCodes } from './keyCodes.js';

keyboardRender();

let keyNums = document.querySelectorAll('.change');
let textarea =  document.getElementById('textarea');
textarea.value = '';
let sistemKeys = document.querySelectorAll('.sistem');
let curruntLang = enKeyCodes;

for (let i = 0; i < 48; i++) {
        keyNums[i].innerHTML = String.fromCharCode(curruntLang[i]);
        // keyNums[i].classList.add(`data = ${enKeyCodes[i]}`);
        keyNums[i].setAttribute('data', String.fromCharCode(curruntLang[i]));
}

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
                console.log(event);
                console.log(event.keyCode);
                if (event.keyCode == 9) {
                        event.returnValue = false;
                }
                else if (event.keyCode == 16 || event.keyCode == 17 || event.keyCode == 18 || event.keyCode == 91 || event.keyCode == 93 || event.keyCode == 37 ) {
                        document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
                }
                // if (event.keyCode == 20) {
                //         // document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
                //         document.querySelector('.indicator').classList.toggle('caps-on');
                // }
                else {
                        document.querySelector(`.key[data = "${event.key}"]`).classList.add('active');
                }
                textarea.focus();
        });
        document.addEventListener('keyup', function(event) {
                // if (event.keyCode == 20) {
                //         document.querySelector('.indicator').classList.;
                // };
                document.querySelectorAll(`.key`).forEach(element => {
                        element.classList.remove('active');
                })
        });

        document.querySelectorAll('.key').forEach(element => {
                element.addEventListener('mousedown', function(event) {
                        // console.log(event.target.getAttribute('data'));
                        event.target.classList.add('active');
                        let keyValue = event.target.classList.value;
                        if (keyValue == 'key change active' || keyValue == 'key space sistem active') {
                                let letter = event.target.getAttribute('data');
                                textarea.focus();
                                textarea.value += letter;
                                textarea.focus();
                        }
                        // console.log(textarea.value);
                });
                element.addEventListener('mouseup', function(event) {
                        event.target.classList.remove('active');
                        // console.log(event.target);
                });
        });
}

keyHandler();
