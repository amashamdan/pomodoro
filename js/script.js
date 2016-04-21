$(document).ready(function() {
	// timer needs to be here for scopes.
	var timer;
	$(".timer-wrap").click(function() {
		clearInterval(timer);
		var minutes = $(".time-input").val();
		var seconds = 0;
		printTime(minutes, seconds);
		timer = setInterval(function() {
			if (seconds === 0 && minutes !== 0){
				minutes--;
				seconds = 59;
				printTime(minutes, seconds);
			} else {
				seconds--;
				printTime(minutes, seconds);
			}
		}, 1000);
	})
})

function printTime(minutes, seconds) {
	if (minutes < 10 && seconds < 10) {
		$(".current-time").html("0" + minutes + " : 0" + seconds);
	} else if (minutes < 10 && seconds >= 10) {
		$(".current-time").html("0" + minutes + " : " + seconds);
	} else if (minutes >= 10 && seconds < 10) {
		$(".current-time").html( minutes + " : 0" + seconds);
	} else if (minutes >=10 && minutes >= 10) {
		$(".current-time").html(minutes + " : " + seconds);
	}
}

