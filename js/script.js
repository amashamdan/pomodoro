$(document).ready(function() {
	var timer;
	$(".timer-wrap").click(function() {
		clearInterval(timer);
		var minutes = $(".time-input").val();
		var seconds = 0;
		$(".current-time").html(minutes + ":00");
		timer = setInterval(function() {
			if (seconds === 0){
				minutes--;
				seconds = 59;
				$(".current-time").html(minutes + ":" + seconds);
			} else {
				seconds--;
				$(".current-time").html(minutes + ":" + seconds);
			}
		}, 1000);
	})

/*
	$(".clear").click(function() {
		clearInterval(timer);
	})
*/
})

