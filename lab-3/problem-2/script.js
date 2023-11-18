document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const startButton = document.querySelector('button');
    const countdownDisplay = document.getElementById('countdown');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');

    // Observable for the start button click
    const startButtonClick$ = rxjs.fromEvent(startButton, 'click');

    // Hold the countdown interval
    let countdownSubscription;

    window.startCountdown = () => {
        // Total seconds from user input
        const totalSeconds = (parseInt(hoursInput.value) || 0) * 3600 + (parseInt(minutesInput.value) || 0) * 60 + (parseInt(secondsInput.value) || 0);

        if (totalSeconds <= 0) 
        {
            alert('Enter in only valid time.');
            return;
        }

        let remainingSeconds = totalSeconds;

        countdownSubscription = rxjs.interval(1000)
        .pipe(
            rxjs.operators.takeWhile(() => remainingSeconds >= 0),
            rxjs.operators.map(() => {
                // Minutes and seconds to display
                const minutes = Math.floor(remainingSeconds / 60);
                const seconds = remainingSeconds % 60;

                // Updating display
                if (remainingSeconds > 0) 
                {
                    countdownDisplay.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                }
                else 
                {
                    countdownDisplay.innerHTML = '00';
                }

                remainingSeconds--;

                return remainingSeconds;
            })
        )
        .subscribe((remaining) => {
            // Clearing countdown interval when reaches 0
            if (remaining < 0) 
            {
                countdownSubscription.unsubscribe();
            }
        });
    };

    startButtonClick$.subscribe(startCountdown);
});