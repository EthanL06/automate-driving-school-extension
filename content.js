let hasSubmitted = false;

// Function to check the countdown timer and form submission
function checkCountdown() {
  if (hasSubmitted) {
    clearInterval();
    return;
  }

  console.log("Checking countdown timer");
  const timerSpan = document.querySelector("span.learndash_timer");
  const form = document.querySelector("form.sfwd-mark-complete");
  console.log(timerSpan);
  console.log(form);
  if (!timerSpan || !form) {
    return;
  }

  // Check the timer value
  const timeText = timerSpan.innerText;
  console.log(timeText);
  if (
    timeText === "00:00:00" ||
    window.getComputedStyle(timerSpan).display === "none"
  ) {
    hasSubmitted = true;
    console.log("Submitting form");
    form.submit();
    // Turn off the interval
  }
}

// Wait 2 seconds
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function () {
  await wait(1000);
  console.log("Content script running");
  // Find the button with the title Mute and click it
  let muteButton = document.querySelector("button[title='Mute']");
  if (muteButton) {
    muteButton.click();
  }

  // Check if the URL contains the slug "topic"
  if (!window.location.href.includes("topic")) {
    const incompleteLink = document.querySelector("a.learndash-incomplete");
    if (incompleteLink) {
      console.log("Clicking incomplete link");
      incompleteLink.click();
    } else if (window.location.href.includes("lessons")) {
      const audio = new Audio(
        chrome.runtime.getURL("/sounds/mixkit-classic-alarm-995.wav")
      );

      audio.addEventListener(
        "ended",
        function () {
          this.currentTime = 0;
          this.play();
        },
        { once: true }
      );

      audio.play();

      await wait(10000);
      alert("Finished chapter!");
    }
  } else {
    // Set an interval to check every second
    setInterval(checkCountdown, 1000);
  }
})();

// // Find the button with the title Mute and click it
// let muteButton = document.querySelector("button[title='Mute']");
// if (muteButton) {
//   muteButton.click();
// }

// // Check if the URL contains the slug "topic"
// if (!window.location.href.includes("topic")) {
//   const incompleteLink = document.querySelector("a.learndash-incomplete");
//   if (incompleteLink) {
//     console.log("Clicking incomplete link");
//     incompleteLink.click();
//   } else {
//     const audio = new Audio("./sounds/mixkit-classic-alarm-995.wav");
//     audio.play();
//     alert("No incomplete link found");
//     // Make a sound
//   }
// } else {
//   // Set an interval to check every second
//   setInterval(checkCountdown, 1000);
// }
