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
			/* Math.floor is used in case the user enteres a non-integer. */
			$(this).siblings(".time-input").val(Math.floor(Number($(this).siblings(".time-input").val())) + 1);
		/* If no value was entered, the default value which is found in the
		placeholder attribute is grabbed and incremented by one. */
		} else {
			var num = $(this).siblings(".time-input").attr("placeholder");
			$(this).siblings(".time-input").val(Number(num) + 1);
		}
	})

	/* Same functionality as plus handler, but value are now decremented. */
	$(".minus").click(function() {
		if (Number($(this).siblings(".time-input").val()) !== 1) {
			if ($(this).siblings(".time-input").val()) {
				$(this).siblings(".time-input").val(Math.floor(Number($(this).siblings(".time-input").val())) - 1);
			} else {
				var num = $(this).siblings(".time-input").attr("placeholder");
				$(this).siblings(".time-input").val(Number(num) - 1);
			}
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
			var minutes = Math.floor($(".session-input").val());
			/* prinTime is the function responsible for displaying time. */
			printTime(minutes, 0);
		/* If the user didn't enter a time, the default times are called with
		printTime function. */
		} else {
			printTime(25, 0);
		}
	})
})

/* The start timer function start counting down. */
function startTimer() {
	/* If the timer is going to be started without being paused previously (running
	for the first time or after reset). The following executes. */
	if (!paused) {
		/* If statements checks whether to start a session or break timer. */
		if (status === "session") {
			/* The session input field is checked for user input. */
			if ($(".session-input").val()){
				/* The user input is saved into minutes varialbe. */
				var minutes = Math.floor($(".session-input").val());
			} else {
				/* If no user input is found, the timer is set to the default
				value of 25 minutes. */
				var minutes = 25;
			}
			/* Seconds variable set to 0. */
			var seconds = 0;
		/* Same happens if the break timer is about to be started. */
		} else if (status === "break") {
			if ($(".break-input").val()){	
				var minutes = Math.floor($(".break-input").val());
			} else {
				var minutes = 5;
			}
			var seconds = 0;
		}
	/* If paused is true, it means the timer should be resumed from where it was
	paused, the values of saved minutes and seconds are restored to be used with
	the timer. */
	} else {
		var minutes = savedMinutes;
		var seconds = savedSeconds;
	}
	/* The time is displayed using the function printTime. */
	printTime(minutes, seconds);
	/* The timer is started. */
	timer = setInterval(function() {
		/* checkTime function is called which is responsible for decrementing
		time. It returns the new minutes and seconds values which are stored in 
		the variable temp. */
		var temp = checkTime(minutes, seconds, timer);
		/* new minutes value is restored from temp. */
		minutes = temp[0];
		/* This value is stored in savedMinutes which is used in case the timer
		is paused. */
		savedMinutes = temp[0];
		/* The same is repeated for seconds. */
		seconds = temp[1];
		savedSeconds = temp[1];
	}, 1000);
}

/* This function decrements the values for minutes and seconds. */
function checkTime(minutes, seconds, timer) {
	/* If seconds is zero and minutes is not, it means a whole minute has elapsed,
	minutes is decremented by one and seconds is set back to 59. Then time is 
	updated on display. */
	if (seconds === 0 && minutes !== 0){
		minutes--;
		seconds = 59;
		printTime(minutes, seconds);
	/* If minutes and seconds are zero, the following executes. */
	} else if (seconds === 0 && minutes === 0) {
		/* Timer is stopped */
		clearInterval(timer);
		/* paused set to false (otherwise, in startTimer function, 0 will keep
		being loaded in minutes and seconds.) */
		paused = false;
		/* If status equals session, it means the timer has ended a session. */
		if (status === "session"){	
			/* The status is set to break. */
			status = "break";
			/* The startTimer function called and will start a break. */
			startTimer();
			/* The backfround color is changed and the word Break is displayed 
			above the timer. */
			$("body").css({"backgroundColor": "#008B8B"});
			$(".status").html("Break");
		/* If status equals break, it means the timer has ended a break. */
		} else {
			/* The status is set to session. */
			status = "session";
			/* The startTimer function called and will start a session. */
			startTimer();
			/* The backfround color is changed and the word Session is displayed 
			above the timer. */
			$("body").css({"backgroundColor": "#1c1c1c"});
			$(".status").html("Session");
		}
	/* If seconds is not zero, seconds is decremented, minutes remains unchanged,
	and printTime is called to update the time on display. */
	} else {
		seconds--;
		printTime(minutes, seconds);
	}
	/* The new values of minutes and seconds are returned. */
	return [minutes, seconds];
}

/* The printTime function displays the time on display with proper format.
Minutes and seconds are always displayed as two digits even if less than 10. */
function printTime(minutes, seconds) {
	/* The following if statements check for the values of minutes and seconds,
	and adds a 0 before both is any of them is below 10 (to be displayed as 07 
	instead of 7 for example). */
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