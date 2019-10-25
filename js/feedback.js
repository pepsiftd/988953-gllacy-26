/* обработка обратной связи */
var feedback_button = document.querySelector(".feedback-button");
var modal_feedback = document.querySelector(".modal-feedback");
var feedback_close = document.querySelector(".modal-feedback .modal-close");
var overlay = document.querySelector(".overlay");

feedback_button.addEventListener("click", function(evt) {
	evt.preventDefault();
	show(modal_feedback);
	show(overlay)
});

feedback_close.addEventListener("click", function(evt) {
	evt.preventDefault();
	hide(modal_feedback);
	hide(overlay);
});