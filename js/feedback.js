/* обработка обратной связи */
var feedback_name = document.querySelector("#name");
var feedback_email = document.querySelector("#feedback-email");
var feedback_comment = document.querySelector("#comment");

feedback_button.addEventListener("click", function(evt) {
	evt.preventDefault();
	show(modal_feedback);
	show(overlay);
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
	hide(modal_feedback);
	hide(overlay);
});

modal_feedback.addEventListener("submit", function(evt) {
	if(!feedback_name.value || !feedback_email.value) {
		evt.preventDefault();
		modal_feedback.classList.add("modal-error");
	} else {
		if(storage_is_supported) {
			localStorage.setItem("name", feedback_name.value);
			localStorage.setItem("feedback_email", feedback_email.value);
		}
	}
});