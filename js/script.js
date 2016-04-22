// timer needs to be here for scopes.
var timer;
var timer2;
var status = "session";
var timerRunning = false;
var paused = false;
var savedMinutes;
var savedSeconds;

$(document).ready(function() {
	$(".timer-wrap").click(function() {
		clearInterval(timer);
		clearInterval(timer2);
		if (timerRunning) {
			paused = true;
			timerRunning = false;
		} else {
			timerRunning = true;
			startSession();
		}
	})

	$(".plus").click(function() {
		if ($(this).siblings(".time-input").val()) {
			$(this).siblings(".time-input").val(Number($(this).siblings(".time-input").val()) + 1);
		} else {
			var num = $(this).siblings(".time-input").attr("placeholder");
			$(this).siblings(".time-input").val(Number(num) + 1);
		}
	})

	$(".minus").click(function() {
		if ($(this).siblings(".time-input").val()) {
			$(this).siblings(".time-input").val(Number($(this).siblings(".time-input").val()) - 1);
		} else {
			var num = $(this).siblings(".time-input").attr("placeholder");
			$(this).siblings(".time-input").val(Number(num) - 1);
		}
	})
})

function startSession() {
	if (!paused) {
		if ($(".session-input").val()){
			var minutes = $(".session-input").val();
		} else {
			var minutes = 25;
		}
		var seconds = 0;
	} else {
		var minutes = savedMinutes;
		var seconds = savedSeconds;
	}
	printTime(minutes, seconds);
	timer = setInterval(function() {
		var temp = checkTime(minutes, seconds, timer);
		minutes = temp[0];
		savedMinutes = temp[0];
		seconds = temp[1];
		savedSeconds = temp[1];
	}, 1000);
}

function startBreak() {
	if (!paused) {
		if ($(".break-input").val()){	
			var minutes = $(".break-input").val();
		} else {
			var minutes = 5;
		}
		var seconds = 0;
	} else {
		var minutes = savedMinutes;
		var seconds = savedSeconds;	
	}
	printTime(minutes, seconds);
	timer2 = setInterval(function() {
		var temp = checkTime(minutes, seconds, timer2);
		minutes = temp[0];
		savedMinutes = temp[0];
		seconds = temp[1];
		savedSeconds = temp[1];
	}, 1000);
}

function checkTime(minutes, seconds, timer) {
	if (seconds === 0 && minutes !== 0){
		minutes--;
		seconds = 59;
		printTime(minutes, seconds);
	} else if (seconds === 0 && minutes === 0) {
		clearInterval(timer);
		paused = false;
		if (status === "session"){	
			startBreak();
			$("body").css({"backgroundColor": "#008B8B"});
			$(".status").html("Break");
			status = "break";
		} else {
			startSession();
			$("body").css({"backgroundColor": "#1c1c1c"});
			$(".status").html("Session");
			status = "session";
		}
	} else {
		seconds--;
		printTime(minutes, seconds);
	}
	return [minutes, seconds];
}

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