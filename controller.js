/**
 * Created by Wade on 9/17/2015.
 * Scrape the Timecard website for information about
 * hours and pay.
*/


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
main();
