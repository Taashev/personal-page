// import {enableValidation, resetValidation} from '../scripts/validation.js';

const root = document.documentElement;
const theme = document.querySelector('.theme');
const buttonContact = document.querySelector('.buttons__item_type_contact');
const popupContact = document.querySelector('.popup_type_contact');
const buttonPortfolio = document.querySelector('.nav__item_type_portfolio');
const buttonAbout = document.querySelector('.nav__item_type_about');
const pageProject = document.querySelector('.project');
const pageAbout = document.querySelector('.about');
// const formFeedback = document.forms.feedback;

// theme
root.id = localStorage.getItem('theme') ?? 'dark';

theme.addEventListener('click', () => {
	if (root.id === 'dark') {
		localStorage.setItem('theme', 'light');
		return root.id = 'light';
	}

	localStorage.setItem('theme', 'dark');
	return root.id = 'dark';
});


// popup
function popupOpen(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keyup', closePopupEsc);
};

buttonContact.addEventListener('click', (e) => {
	popupOpen(popupContact);
	popupContact.addEventListener('click', handlerCopyText);
});

function popupClose(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keyup', closePopupEsc);
};

function closePopupEsc(e) {
	if (e.key == 'Escape') {
		popupClose(popupContact);
	}
};

const popupButtonClose = document.querySelector('.popup__close');

popupButtonClose.addEventListener('click', () => {
	popupClose(popupContact);
	popupContact.removeEventListener('click', handlerCopyText);
	// resetValidation(formFeedback, '.popup__input');
	// formFeedback.reset();
});


// copy text
function handlerCopyText(e) {
	if (!!e.target.closest('.contact__item')) {
		navigator
			.clipboard
			.writeText(e.target.closest('.contact__item').querySelector('.contact__value').textContent);

			notification('copied');
	}
};


// notification
function notification(text) {
	const notification = document.querySelector('.notification');
	notification.textContent = text;
	notification.classList.add('notification_show');

	setTimeout(() => {
		notification.classList.remove('notification_show')
	}, 1100);
};


// page toggle
buttonPortfolio.addEventListener('click', () => {
	buttonPortfolio.classList.add('nav__item_active');
	buttonAbout.classList.remove('nav__item_active');
	pageProject.classList.add('project_active');
	pageAbout.classList.remove('about_active');
});

buttonAbout.addEventListener('click', () => {
	buttonPortfolio.classList.remove('nav__item_active');
	buttonAbout.classList.add('nav__item_active');
	pageProject.classList.remove('project_active');
	pageAbout.classList.add('about_active');
});


// ! обработка формы отправки писем с сайта отключена
// formFeedback.addEventListener('submit', (e) => {
// 	e.preventDefault();

// 	formFeedback.reset();
// 	notification('letter sent');
// 	resetValidation(formFeedback, '.popup__input');
// });

// enableValidation('.popup__form', '.popup__input');
