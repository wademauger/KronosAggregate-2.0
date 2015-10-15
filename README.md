# KronosAggregate-2.0

###Find the aggregate number of hours you have worked this pay period.

A Google Chrome extensions to be run after logging into your student timecard. See how much time you've worked in the current pay period among all jobs and wages tracked by the timecard!

##How does it work?

The extension makes some simple HTTP requests, asking the Kronos server for information about you and your work hours. Kronos responds with JSON, which is then parsed, analised and displayed.

##Installation

This extension is NOT currently listed in the chrome store. Until it is (if it is ever) listed on the Chrome store, to use this extension, you will have to install it manually.

1. `git clone`
2. In the repo directory, open the file `popup.js`.
3. Find the line `getUserJSON('https://fastapps.rit.edu/kronosTimecard/rest/employeebyusername/<dce>, function (data){`, and replace `<dce>` with your RIT username. Save and close the file.
4. Open Google Chrome, and go to `chrome://extensions`.
5. Drag the repo folder into the Chrome window.

You now have the extension installed.

##Use

1. Open your Kronos Timecard in a chrome window
2. Click the clock icon button in the top right corner of your window
3. ???
4. Profit.
