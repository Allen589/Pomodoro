var states = {
    "off": "garbage text",
    "pomodoro": "garbage text"
};
var currentState = "off";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.command === "startTimer" && currentState === "off") {
        startTimer();
        sendResponse({message: "Timer started."});
      }
  });


function startTimer() {
  var start = moment();
  setInterval(function() {
    var diff = moment().diff(start, 'seconds');
    updateTime(diff);
  }, 1000);
  currentState = "pomodoro";
}

function updateTime(diff) {
  chrome.runtime.sendMessage({
      "command": "updateTime",
      "time": diff});
}
