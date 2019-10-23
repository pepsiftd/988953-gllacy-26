function modal(button, modal_window) {
	this.button = button;
	this.modal_window = modal_window;
	this.clicked = false;
}

var search = new modal(document.querySelector(".search-button"), document.querySelector(".modal-search"));
var login = new modal(document.querySelector(".login-button"), document.querySelector(".modal-login"));
var basket = new modal(document.querySelector(".basket-button"), document.querySelector(".modal-basket"));

var all_modal_windows = [search, login, basket];

var delay = 200;

var show = function(modal_window){
	modal_window.classList.add("modal-show");
}

var hide = function(modal_window){
	modal_window.classList.remove("modal-show");
}


/* Функция для скрытия окна с задержкой и закрытия по клику вне окна */
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
}

modal_show_on_hover(search);
modal_show_on_hover(login);
modal_show_on_hover(basket);

/* скрыть по клику вне объекта */
document.addEventListener("click", e => {
	var target = e.target;
	all_modal_windows.forEach(function(item, i, arr) {
				// если модалка существует и кликнули не по ней и не по вложенному в неё объекту
			if(item.modal_window && target != item.modal_window && !item.modal_window.contains(target)) {
				hide(item.modal_window);
				item.clicked = false;
			}
	});
});

/* обработка обратной связи */
var feedback_button = document.querySelector(".feedback-button");
var modal_feedback = document.querySelector(".modal-feedback");
var feedback_close = document.querySelector(".modal-feedback .modal-close")

feedback_button.addEventListener("click", function(evt) {
	evt.preventDefault();
	show(modal_feedback);
});

feedback_close.addEventListener("click", function(evt) {
	evt.preventDefault();
	hide(modal_feedback);
});