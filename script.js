// eslint-disable-next-line import/extensions
import keyboardRender from './keyboardRender.js';
import {
	rusKeyCodes, enKeyCodes, shiftRusKeyCodes,
	shiftEnKeyCodes, capsEnKeyCodes, capsRusKeyCodes,
	keyCodes, optEnKeyCodes, optRusKeyCodes,
	// eslint-disable-next-line import/extensions
} from './keyCodes.js';

let currentLang;

keyboardRender();
if (!localStorage.getItem('currentLang')) {
	currentLang = enKeyCodes;
} else {
	localStorage.getItem('currentLang') === 'en' ? currentLang = enKeyCodes : currentLang = rusKeyCodes;
}

const keyNums = document.querySelectorAll('.change');
const textarea = document.getElementById('textarea');
textarea.value = '';
const capsPress = document.getElementById('CapsLock').classList === 'key caps sistem active';


const alphabetRender = (lang) => {
	for (let i = 0; i < 48; i += 1) {
		keyNums[i].innerHTML = String.fromCharCode(lang[i]);
		keyNums[i].setAttribute('data', String.fromCharCode(lang[i]));
		keyNums[i].setAttribute('id', keyCodes[i]);
	}
};
alphabetRender(currentLang);

const keyHandler = () => {
	document.addEventListener('keydown', (event) => {
		event.preventDefault();

		const pressLeftOption = document.getElementById('AltLeft').className === 'key opt sistem active';
		const pressLeftControl = document.getElementById('ControlLeft').className === 'key ctrl sistem active';

		switch (event.keyCode) {
			case 9:
				document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
				event.returnValue = false;
				textarea.value += '    ';
				break;
			case 8:
				document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
				textarea.value = textarea.value.slice(0, -1);
				break;
			case 13:
				document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
				textarea.value += '\n';
				break;
			case 20:
				document.querySelector(`.key[data = "${event.key}"]`).classList.toggle('active');
				if (currentLang[48] === 'en') {
					currentLang === enKeyCodes ? currentLang = capsEnKeyCodes : currentLang = enKeyCodes;
				} else if (currentLang[48] === 'ru') {
					currentLang === rusKeyCodes ? currentLang = capsRusKeyCodes : currentLang = rusKeyCodes;
				}
				alphabetRender(currentLang);
				localStorage.setItem('currentLang', currentLang[48]);
				break;
			case 16:
				document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
				if (currentLang[48] === 'en') {
					currentLang === enKeyCodes ? currentLang = shiftEnKeyCodes : currentLang = enKeyCodes;
				} else if (currentLang[48] === 'ru') {
					currentLang === rusKeyCodes ? currentLang = shiftRusKeyCodes : currentLang = rusKeyCodes;
				}
				alphabetRender(currentLang);
				break;
			case 17:
				document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
				if (currentLang[48] === 'ru' && (capsPress || pressLeftOption)) {
					currentLang = enKeyCodes;
				} else if (currentLang[48] === 'en' && (capsPress || pressLeftOption)) {
					currentLang = rusKeyCodes;
				}
				alphabetRender(currentLang);
				break;
			case 18:
				document.querySelector(`.key[data = "${event.code}"]`).classList.add('active');
				if (currentLang[48] === 'en' && !event.ctrlKey && !pressLeftControl) {
					currentLang = optEnKeyCodes;
				} else if (currentLang[48] === 'ru' && !event.ctrlKey && !pressLeftControl) {
					currentLang = optRusKeyCodes;
				} else if (currentLang[48] === 'ru' && (event.ctrlKey || pressLeftControl)) {
					currentLang = enKeyCodes;
				} else if (currentLang[48] === 'en' && (event.ctrlKey || pressLeftControl)) {
					currentLang = rusKeyCodes;
				}
				localStorage.setItem('currentLang', currentLang[48]);
				alphabetRender(currentLang);
				break;
			case 32:
				document.querySelector(`.key[id = "${event.code}"]`).classList.add('active');
				textarea.value += ' ';
				break;
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
	document.addEventListener('keyup', (event) => {
		document.querySelectorAll('.key').forEach((element) => {
			if (currentLang !== capsEnKeyCodes || currentLang !== capsRusKeyCodes) {
				if (element.getAttribute('data') !== 'CapsLock') {
					element.classList.remove('active');
				}
			}
		});
		if (event.key === 'Shift') {
			if (currentLang[48] === 'en') {
				currentLang === shiftEnKeyCodes ? currentLang = enKeyCodes : currentLang = capsEnKeyCodes;
			} else if (currentLang[48] === 'ru') {
				currentLang === shiftRusKeyCodes ? currentLang = rusKeyCodes : currentLang = capsRusKeyCodes;
			}
			localStorage.setItem('currentLang', currentLang[48]);
			alphabetRender(currentLang);
		}
		if (event.key === 'Alt') {
			currentLang[48] === 'ru' ? currentLang = rusKeyCodes : currentLang = enKeyCodes;
			alphabetRender(currentLang);
			localStorage.setItem('currentLang', currentLang[48]);
		}
	});
};

const mouseKeyHandler = () => {
	document.querySelectorAll('.key').forEach((element) => {
		element.addEventListener('mousedown', (event) => {
			const lArrow = 'key left-arrow sistem active';
			const rArrow = 'key right-arrow sistem active';
			const upDownArrow = 'key arrow sistem active';
			if (event.target.getAttribute('data') !== 'CapsLock') {
				event.target.classList.add('active');
			}
			const keyValue = event.target.classList.value;
			if (keyValue === 'key change active' || keyValue === 'key space sistem active') {
				const letter = event.target.getAttribute('data');
				textarea.focus();
				textarea.value += letter;
				textarea.focus();
			}
			if (keyValue === lArrow || keyValue === upDownArrow || keyValue === rArrow) {
				const letter = event.target.getAttribute('data');
				textarea.focus();
				textarea.value += letter;
				textarea.focus();
			}

			switch (event.target.getAttribute('data')) {
				case 'Enter':
					textarea.value += '\n';
					break;
				case 'Tab':
					textarea.value += '    ';
					break;
				case 'Backspace':
					textarea.value = textarea.value.slice(0, -1);
					break;
				case 'CapsLock':
					event.target.classList.toggle('active');
					if (currentLang[48] === 'en') {
						currentLang === capsEnKeyCodes ? currentLang = enKeyCodes : currentLang = capsEnKeyCodes;
					} else if (currentLang[48] === 'ru') {
						currentLang === capsRusKeyCodes ? currentLang = rusKeyCodes : currentLang = capsRusKeyCodes;
					}
					localStorage.setItem('currentLang', currentLang[48]);
					alphabetRender(currentLang);
					break;
				case 'ShiftLeft':
				case 'ShiftRight':
					event.target.classList.add('active');
					if (currentLang[48] === 'en') {
						currentLang[49] === 'capsEnKeyCodes' ? currentLang = enKeyCodes : currentLang = shiftEnKeyCodes;
					} else if (currentLang[48] === 'ru') {
						currentLang[49] === 'capsRusKeyCodes' ? currentLang = rusKeyCodes : currentLang = shiftRusKeyCodes;
					}
					localStorage.setItem('currentLang', currentLang[48]);
					alphabetRender(currentLang);
					break;
				case 'AltLeft':
				case 'AltRight':
					event.target.classList.add('active');
					if (currentLang[48] === 'en' && document.getElementById('ControlLeft').classList.value !== 'key ctrl sistem active') {
						currentLang = optEnKeyCodes;
					} else if (currentLang[48] === 'ru' && document.getElementById('ControlLeft').classList.value !== 'key ctrl sistem active') {
						currentLang = optRusKeyCodes;
					} else if (currentLang[48] === 'en' && document.getElementById('ControlLeft').classList.value === 'key ctrl sistem active') {
						currentLang = rusKeyCodes;
					} else if (currentLang[48] === 'ru' && document.getElementById('ControlLeft').classList.value === 'key ctrl sistem active') {
						currentLang = enKeyCodes;
					}
					localStorage.setItem('currentLang', currentLang[48]);
					alphabetRender(currentLang);
					break;
				case 'ControlLeft':
					event.target.classList.add('active');
					if (currentLang[48] === 'en' && document.getElementById('AltLeft').classList.value === 'key opt sistem active') {
						currentLang = rusKeyCodes;
					} else if (currentLang[48] === 'ru' && document.getElementById('AltLeft').classList.value === 'key opt sistem active') {
						currentLang = enKeyCodes;
					}
					localStorage.setItem('currentLang', currentLang[48]);
					alphabetRender(currentLang);
					break;
				case 'onOff':
					document.getElementById('screen').classList.toggle('hidden');
					document.getElementById('black-screen').classList.toggle('hidden');
					break;
				default:
					break;
			}
		});
		element.addEventListener('mouseup', (event) => {
			const currentKey = event.target.getAttribute('data');
			// eslint-disable-next-line
			const capsBtnPress = document.getElementById('CapsLock').classList == 'key caps sistem active';

			if (currentKey !== 'CapsLock') {
				event.target.classList.remove('active');
				if (currentKey === 'ShiftLeft' || currentKey === 'ShiftRight' || currentKey === 'AltLeft' || currentKey === 'AltRight') {
					if (currentLang[48] === 'en') {
						capsBtnPress ? currentLang = capsEnKeyCodes : currentLang = enKeyCodes;
					} else if (currentLang[48] === 'ru') {
						capsBtnPress ? currentLang = capsRusKeyCodes : currentLang = rusKeyCodes;
					}
					localStorage.setItem('currentLang', currentLang[48]);
					alphabetRender(currentLang);
				}
			}
			textarea.focus();
		});
	});
};

keyHandler();
mouseKeyHandler();
