/* All variables below are defined in the global scope because they were
called in different functions. */

/* timer is a variable which holds the setInterval function. */
var timer;
/* status holds a string, either "break" or "session." */
var status = "session";
/* timerRunning variable indicated whether the timer is running or not. */
var timerRunning = false;
/* paused variable is used to decide weather to use the stored time or the
default value once the timer is clicked. If paused is true, it means the timer
was originally running before being paused. */
var paused = false;
/* savedMinutes and savedSeconds are used to store values for minutes and 
seconds. They are stored to be used as starting point for the timer once it's
resumed. */
var savedMinutes;
var savedSeconds;

/* Elements' click function placed here to tun properly. */
$(document).ready(function() {
	/* The if statement sets the max width of the container to a high value 
	so that the page's width is 100% if displayed on cell phones. Media queries
	may not help if the phone has a high resolution display.*/
	if ($(window).width() < $(window).height()) {
		$(".container").css({"max-width": "1500px"});
	}
	/* Timer's click handler */
	$(".timer-wrap").click(function() {
		/* The timer is cleared (paused) once the timer is clicked. */
		clearInterval(timer);
		/* If the timer was running, puased is set to true (timer now paused),
		and timeRunning to false. */
		if (timerRunning) {
			paused = true;
			timerRunning = false;
		/* If the timer wasn't running, timeRunning is set to true, and startTimer
		function is called to start the timer. */
		} else {
			timerRunning = true;
			startTimer();
		}
	})

	/* A click handler for the two "+" buttons */
	$(".plus").click(function() {
		/* If the user entered a time in the input field (either fields),
		that value is incremented by one. */
		if ($(this).siblings(".time-input").val()) {
			$(this).siblings(".time-input").val(Number($(this).siblings(".time-input").val()) + 1);
		/* If no value was entered, the default value which is found in the
		placeholder attribute is grabbed and incremented by one. */
		} else {
			var num = $(this).siblings(".time-input").attr("placeholder");
			$(this).siblings(".time-input").val(Number(num) + 1);
		}
	})

	/* Same functionality as plus handler, but value are now decremented. */
	$(".minus").click(function() {
		if ($(this).siblings(".time-input").val()) {
			$(this).siblings(".time-input").val(Number($(this).siblings(".time-input").val()) - 1);
		} else {
			var num = $(this).siblings(".time-input").attr("placeholder");
			$(this).siblings(".time-input").val(Number(num) - 1);
		}
	})

	/* Reser button handler. */
	$(".reset-button").click(function() {
		/* Timer is cleared, all global variables are set back to initial values. */
		clearInterval(timer);
		timerRunning = false;
		paused = false;
		status = "session";
		$("body").css({"backgroundColor": "#1c1c1c"});
		$(".status").html("Session");
		/* If the user has time entered, the timer would reset to that entered 
		value. */
		if ($(".session-input").val()) {
			var minutes = $(".session-input").val();
			/* prinTime is the function responsible for displaying time. */
			printTime(minutes, 0);
		/* If the user didn't enter a time, the default times are called with
		printTime function. */
		} else {
			printTime(25, 0);
		}
	})
})

function startTimer() {
	if (!paused) {
		if (status === "session") {
			if ($(".session-input").val()){
				var minutes = $(".session-input").val();
			} else {
				var minutes = 25;
			}
			var seconds = 0;
		} else if (status === "break") {
			if ($(".break-input").val()){	
				var minutes = $(".break-input").val();
			} else {
				var minutes = 5;
			}
			var seconds = 0;
		}
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

function checkTime(minutes, seconds, timer) {
	if (seconds === 0 && minutes !== 0){
		minutes--;
		seconds = 59;
		printTime(minutes, seconds);
	} else if (seconds === 0 && minutes === 0) {
		clearInterval(timer);
		paused = false;
		if (status === "session"){	
			status = "break";
			startTimer();
			$("body").css({"backgroundColor": "#008B8B"});
			$(".status").html("Break");

		} else {
			status = "session";
			startTimer();
			$("body").css({"backgroundColor": "#1c1c1c"});
			$(".status").html("Session");
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