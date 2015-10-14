/**
 * Created by Wade on 9/17/2015.
 * Scrape the Timecard website for information about
 * hours and pay.
*/
'use strict';
var JobIDs = [];

function getJobIDs(listIDs){
    console.log(document)
    var radio_groups = document.getElementsByTagName("md-radio-group");
    var jobs_group = (radio_groups[0].innerHTML.indexOf("job.id") >= -1) ? radio_groups[0] : radio_groups[1];
    //for (var prop in jobs_group){
    //    console.log(prop);
    //}
    console.log(jobs_group.children);

}

function main() {

    function getJSON(url, callback){
        var request = new XMLHttpRequest();
        request.open('GET', url);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                callback(data);
            }
        };

        request.send();
    }

    getJSON('/kronosTimecard/rest/timecard/843494/2015-10-02/2015-10-15', function (data){
        console.log(data);
    });

}
//main();
getJobIDs(JobIDs);