function modal(button, modal_window) {
	this.button = button;
	this.modal_window = modal_window;
	this.clicked = false;
}

var search = new modal(document.querySelector(".search-button"), document.querySelector(".modal-search"));
var login = new modal(document.querySelector(".login-button"), document.querySelector(".modal-login"));
var basket = new modal(document.querySelector(".basket-button"), document.querySelector(".modal-basket"));

var feedback_button = document.querySelector(".feedback-button");
var modal_feedback = document.querySelector(".modal-feedback");
var feedback_close = document.querySelector(".modal-feedback .modal-close");
var overlay = document.querySelector(".overlay");

var all_modal_windows = [search, login, basket];

var delay = 200;

var show = function(modal_window){
	modal_window.classList.add("modal-show");
}

var hide = function(modal_window){
	modal_window.classList.remove("modal-show");
}



/* Функция для показа при наведении и скрытия окна с задержкой */
var modal_show_on_hover = function (modal) {
	
	if(!modal.modal_window) return 0;
	var timeout = null;
	

	/* показывать при наведении на кнопку*/
	modal.button.addEventListener("mouseover", function() {
		show(modal.modal_window);
		clearTimeout(timeout);
	});

	/* скрывать с задержкой при уходе с кнопки */
	modal.button.addEventListener("mouseout", function() {
		if(!modal.clicked) {
			timeout = setTimeout(function() {
				hide(modal.modal_window);
			}, delay);
		}
	});

	/* отменить скрытие, если перевели мышь на окно */
	modal.modal_window.addEventListener("mouseover", function() {
		clearTimeout(timeout);
	});

	/* отменить скрытие, если кликнули по окну */
	modal.modal_window.addEventListener("click", function() {
		clearTimeout(timeout);
		modal.clicked = true;
	});

	/* скрыть с задержкой, если ушли с окна, не кликнув по нему */
	modal.modal_window.addEventListener("mouseout", function() {
		if(!modal.clicked) {
			timeout = setTimeout(function() {
				hide(modal.modal_window);
			}, delay);
		}
	});

} //конец функции modal_show_on_hover

modal_show_on_hover(search);
modal_show_on_hover(login);
modal_show_on_hover(basket);

/* скрыть по клику вне объекта */
document.addEventListener("click", function(evt) {
	var target = evt.target;
	all_modal_windows.forEach(function(item, i, arr) {
				// если модалка существует и кликнули не по ней и не по вложенному в неё объекту
			if(item.modal_window && target != item.modal_window && !item.modal_window.contains(target)) {
				item.modal_window.classList.remove("modal-error");
				hide(item.modal_window);
				item.clicked = false;
			}
	});
});

// закрытие модалок при нажатии ESC

window.addEventListener("keydown", function(evt) {
	if(evt.keyCode === 27) {
		all_modal_windows.forEach(function(item, i, arr) {
			// если модалка существует и открыта
			if(item.modal_window && item.modal_window.classList.contains("modal-show")) {
				evt.preventDefault();
				item.modal_window.classList.remove("modal-error");
				hide(item.modal_window);
				item.clicked = false;
				item.button.focus();
				return 0;
			}
		});
		// если это обратная связь
		if(modal_feedback && modal_feedback.classList.contains("modal-show")) {
			evt.preventDefault();
			modal_feedback.classList.remove("modal-error");
			modal_feedback.classList.remove("bounce");
			hide(modal_feedback);
			hide(overlay);
			feedback_button.focus();
		}
	}
});


// открытие модалок при фокусе на кнопке и нажатии Enter
var search_input = document.querySelector(".search-input");
var login_input = document.querySelector(".modal-login-email-input");
var password_input = document.querySelector(".modal-login-password-input");
var basket_input = document.querySelector(".order-button");

search.button.addEventListener("keydown", function(evt) {
	if (evt.key === "Enter") {
		evt.preventDefault();
		show(search.modal_window);
		search_input.focus();
	}
});

login.button.addEventListener("keydown", function(evt) {
	if (evt.key === "Enter") {
		evt.preventDefault();
		show(login.modal_window);
		if(login_input.value) {
			password_input.focus();
		} else {
			login_input.focus();
		}
	}
});

if(basket.modal_window) {
	basket.button.addEventListener("keydown", function(evt) {
		if (evt.key === "Enter") {
			evt.preventDefault();
			show(basket.modal_window);
			basket_input.focus();
		}
	});
}



// localStorage для поля логина
var storage_login = "";
var storage_is_supported = true;

try {
	storage_login = localStorage.getItem("login");
} catch (err) {
	storage_is_supported = false;
}

if(storage_login) {
	login_input.value = storage_login;
}

// обработка submit у окна входа
var login_form = document.querySelector(".modal-login form");

login_form.addEventListener("submit", function(evt) {
	if(!login_input.value || !password_input.value) {
		evt.preventDefault();
		login.modal_window.classList.remove("modal-error");
		login.modal_window.offsetWidth = login.modal_window.offsetWidth;
		login.modal_window.classList.add("modal-error");
	} else {
		if(storage_is_supported) {
			localStorage.setItem("login", login_input.value);
		}
	}
});

/* обработка обратной связи */

var feedback_name = document.querySelector("#name");
var feedback_email = document.querySelector("#feedback-email");
var feedback_comment = document.querySelector("#comment");

if(modal_feedback) {
	feedback_button.addEventListener("click", function(evt) {
		evt.preventDefault();
		show(modal_feedback);
		show(overlay);
		modal_feedback.classList.add("bounce");
		var feedback_name_value = "";
		var feedback_email_value = "";

		if(storage_is_supported) {
			feedback_name_value = localStorage.getItem("name");
			feedback_email_value = localStorage.getItem("feedback_email");		
		}

		if(feedback_name_value&&feedback_email_value) {
			feedback_name.value = feedback_name_value;
			feedback_email.value = feedback_email_value;
			feedback_comment.focus();
		} else {
			feedback_name.focus();
		}
	});

	feedback_close.addEventListener("click", function(evt) {
		evt.preventDefault();
		modal_feedback.classList.remove("modal-error");
		modal_feedback.classList.remove("bounce");
		hide(modal_feedback);
		hide(overlay);
	});

	modal_feedback.addEventListener("submit", function(evt) {
		if(!feedback_name.value || !feedback_email.value) {
			evt.preventDefault();
			modal_feedback.classList.remove("modal-error");
			modal_feedback.offsetWidth = modal_feedback.offsetWidth;
			modal_feedback.classList.add("modal-error");
		} else {
			if(storage_is_supported) {
				localStorage.setItem("name", feedback_name.value);
				localStorage.setItem("feedback_email", feedback_email.value);
			}
		}
	});
}