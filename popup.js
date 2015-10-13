
document.addEventListener("hello", function(data) {chrome.runtime.sendMessage("Do the thing!");}); var event = document.createEvent("Event"); event.initEvent("hello"); document.dispatchEvent(event);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      process_input(message);
});

function process_input(input){
    display_time(input[0]);
    display_wage(input[1]);
}

function display_time(time){
    var date = new Date(time);
    console.log(date);
    var hours = date.getHours();
    var min = date.getMinutes();

    document.getElementById("hours").innerHTML = hours.toString();
    document.getElementById("minutes").innerHTML = min.toString();
}


function display_wage(money){
    document.getElementById("money").innerHTML = money.float_num.toFixed(2).toString();
}