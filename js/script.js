// timer needs to be here for scopes.
var timer;
var status = "session";

$(document).ready(function() {
	$(".timer-wrap").click(function() {
		clearInterval(timer);
		startSession();
	})
})

function startSession() {
	if ($(".session-input").val()){
		var minutes = $(".session-input").val();
	} else {
		var minutes = 25;
	}
	var seconds = 0;
	printTime(minutes, seconds);
	timer = setInterval(function() {
		var temp = checkTime(minutes, seconds, timer);
		minutes = temp[0];
		seconds = temp[1];
	}, 1000);
}

function startBreak() {
	if ($(".break-input").val()){	
		var minutes = $(".break-input").val();
	} else {
		var minutes = 5;
	}
	var seconds = 0;
	printTime(minutes, seconds);
	var timer2 = setInterval(function() {
		var temp = checkTime(minutes, seconds, timer2);
		minutes = temp[0];
		seconds = temp[1];
	}, 1000);
}

function checkTime(minutes, seconds, timer) {
	if (seconds === 0 && minutes !== 0){
		minutes--;
		seconds = 59;
		printTime(minutes, seconds);
	} else if (seconds === 0 && minutes === 0) {
		clearInterval(timer);
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