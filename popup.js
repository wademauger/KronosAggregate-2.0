/*
* Wade Mauger 2015
* Timecard Aggregator
*
* Information is requested from the server after the user has logged into their timecard review page.
* Information about the user is requested by a url in the form:
*
* https://fastapps.rit.edu/kronosTimecard/rest/employeebyusername/<dce>
*
* Information about the user's work is requested by a url in the form:
*
* https://fastapps.rit.edu/kronosTimecard/rest/timecard/<job_id>/<pay_period_start_date>/<pay_period_end_date>
*
* */

/*
* request the JSON that contains all the information nessesary to
* make further requests.
* */

var GLOBAL_sumTime = 0;
var GLOBAL_jobCount = 0;
var GLOBAL_sumWage = 0;

function getUserJSON(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

getUserJSON('https://fastapps.rit.edu/kronosTimecard/rest/employeebyusername/<dce>', function (data){

    //Parse the given JSON and extract the nessesary information to continue
    data = JSON.parse(data);
    var payPeriodStart = data.list[0].payperiods[0].start_date;
    var payPeriodEnd = data.list[0].payperiods[0].end_date;
    var jobIDs = [];
    for (var iter=0 ; iter<data.list.length ; iter++){
        jobIDs.push(data.list[iter].employeeid);
    }

    //Use the given information to get the user's time worked and wages
    for (var iter_jobs=0 ; iter_jobs<data.list.length ; iter_jobs++){
        var url = "https://fastapps.rit.edu/kronosTimecard/rest/timecard/" + jobIDs[iter_jobs] + '/' + payPeriodStart + '/' + payPeriodEnd;
        //console.log(url);
        getJobJSON(url, function (jobData){

            //Parse the information about the job, and add it to the interface
            jobData = JSON.parse(jobData);

            //iterate through this job's punches, sum the hours and wages for this job,
            //and add it to the global sum
            for (var iter_times=0 ; iter_times<jobData.punchlist.length ; iter_times++){
                var timeIn = new Date(jobData.punchlist[iter_times].in_datetime);
                var timeOut = new Date(jobData.punchlist[iter_times].out_datetime);
                GLOBAL_sumTime += (timeOut - timeIn);
                if (iter_times == 0){
                    GLOBAL_sumWage += Number(jobData.summaries[0].wageamount);
                    console.log("sum wages: ", GLOBAL_sumWage);
                }
            }
            if(GLOBAL_jobCount == data.list.length-1){
                //finished processing
                var timesList = elapsedTimeToOutput(GLOBAL_sumTime);
                console.log(timesList[0])
                display_time(Math.floor(timesList[0]), Math.floor(timesList[1]), Math.floor(GLOBAL_sumWage * 100) / 100);
            }else{
                GLOBAL_jobCount++;
            }
        });
    }
});

function getJobJSON(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

function display_time(hours, minutes, wages){
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("money").innerHTML = wages;
}

function elapsedTimeToOutput(x) {
    //console.log(x);
    var h = x / (60 * 60 * 1000);
    x = x - Math.floor(h) * (60 * 60 * 1000);
    var m = x / (60 * 1000);
    return [h, m];
}