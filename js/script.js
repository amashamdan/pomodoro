$(document).ready(function() {
	// timer needs to be here for scopes.
	var timer;
	$(".timer-wrap").click(function() {
		clearInterval(timer);
		if ($(".session-input").val()){
			var minutes = $(".session-input").val();
		} else {
			var minutes = 25;
		}
		var seconds = 0;
		printTime(minutes, seconds);
		timer = setInterval(function() {
			if (seconds === 0 && minutes !== 0){
				minutes--;
				seconds = 59;
				printTime(minutes, seconds);
			} else if (seconds === 0 && minutes === 0) {
				clearInterval(timer);
				$("body").css({"backgroundColor": "#008B8B"});
				$(".status").html("Break");
				startBreak();
			} else {
				seconds--;
				printTime(minutes, seconds);
			}
		}, 1000);
	})
})

function startBreak() {
	if ($(".break-input").val()){	
		var minutes = $(".break-input").val();
	} else {
		var minutes = 5;
	}
	var seconds = 0;
	var timer2 = setInterval(function() {
		if (seconds === 0 && minutes !== 0){
			minutes--;
			seconds = 59;
			printTime(minutes, seconds);
		} else if (seconds === 0 && minutes === 0) {
			clearInterval(timer2);
			$("body").css({"backgroundColor": "#1c1c1c"});
			$(".status").html("Session");
		} else {
			seconds--;
			printTime(minutes, seconds);
		}
	}, 1000);
}

/*
var aa;
aa = checkTime();
console.log(aa);

function checkTime() {

}*/

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

