const root = document.documentElement;
const theme = document.querySelector('.theme');
const buttonContact = document.querySelector('.buttons__item_type_contact');
const popupContact = document.querySelector('.popup_type_contact');
const contactList = document.querySelector('.contact');
const formFeedback = document.forms.feedback;
const buttonPortfolio = document.querySelector('.nav__item_type_portfolio');
const buttonAbout = document.querySelector('.nav__item_type_about');
const pageProject = document.querySelector('.project');
const pageAbout = document.querySelector('.about');

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
	formFeedback.reset();
	resetValidation(formFeedback, '.popup__input');
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


// handler form feedback
formFeedback.addEventListener('submit', (e) => {
	e.preventDefault();

	formFeedback.reset();
	notification('letter sent');
	resetValidation(formFeedback, '.popup__input');
});



// validate
// show input error
function showInputError(input) {
	const errorElement = input.closest('.popup__input-group').querySelector(`.${input.name}-error`);

	errorElement.textContent = input.validationMessage;
};
// hide input error
function hideInputError(input) {
	const errorElement = input.closest('.popup__input-group').querySelector(`.${input.name}-error`);

	errorElement.textContent = '';
};

// form title active
function formTitleValid(formTitle) {
	formTitle.classList.add('popup__form-title_active');
};
// form title inactive
function formTitleInvalid(formTitle) {
	formTitle.classList.remove('popup__form-title_active');
};

// has invalid input
function hasInvalidInput(inputList) {
	return inputList.some((input) => {
		return !input.validity.valid;
	});
};

// button active
function buttonActive(button) {
	button.disabled = false;
	button.classList.remove('popup__button_inactive');
};
// button inactive
function buttonInactive(button) {
	button.classList.add('popup__button_inactive');
	button.disabled = true;
};
// toggle button state
function toggleButtonState(inputList, button) {
	if(hasInvalidInput(inputList)) {
		buttonInactive(button);
	} else {
		buttonActive(button);
	}
};

// is valid
function isValid(input, formTitle) {
	if (!input.validity.valid) {
		formTitleInvalid(formTitle);
		showInputError(input);
	} else {
		formTitle.classList.add('popup__form-title_active');
		formTitleValid(formTitle);
		hideInputError(input);
	}
};

// set event listener
function setEventListener(form, inputSelector) {
	const inputList = Array.from(form.querySelectorAll(inputSelector));
	const formTitle = form.querySelector('.popup__form-title');
	const buttonSubmit = form.querySelector('.popup__button');

	toggleButtonState(inputList, buttonSubmit);

	inputList.forEach((input) => {
		input.addEventListener('input', () => {
			isValid(input, formTitle);
			toggleButtonState(inputList, buttonSubmit);
		});
	});
};

// enabled validation
function enableValidation(formSelector, inputSelector) {
	const formList = Array.from(document.querySelectorAll(formSelector));

	formList.forEach((form) => {
		setEventListener(form, inputSelector);
	});
};

function resetValidation(formElement, inputSelector) {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const formTitle = formElement.querySelector('.popup__form-title');
	const button = formElement.querySelector('button[type="submit"]');

	toggleButtonState(inputList, button);
	inputList.forEach((input) => {
		formTitleInvalid(formTitle);
		hideInputError(input);
	});
};

enableValidation('.popup__form', '.popup__input');
