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
export function enableValidation(formSelector, inputSelector) {
	const formList = Array.from(document.querySelectorAll(formSelector));

	formList.forEach((form) => {
		setEventListener(form, inputSelector);
	});
};

// reset validation
export function resetValidation(formElement, inputSelector) {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const formTitle = formElement.querySelector('.popup__form-title');
	const button = formElement.querySelector('button[type="submit"]');

	toggleButtonState(inputList, button);
	inputList.forEach((input) => {
		formTitleInvalid(formTitle);
		hideInputError(input);
	});
};
