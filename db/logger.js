// In this example we are showing how to properly use pg-monitor to log
// errors in a DEV and PROD environments.

// As an alternative for a PROD environment, instead of using pg-monitor
// you could handle event 'error' within initialization options yourself,
// which may be a little better performing, but lacks all the nice formatting
// provided by pg-monitor.

var os = require('os');
var fs = require('fs');
var monitor = require('pg-monitor');

// Flag to indicate whether we are in a DEV environment:
var $DEV = process.env.NODE_ENV === 'development';

// Log file for database-related errors:
var logFile = './errors.log';

// Below we are logging errors exactly the way they are reported by pg-monitor,
// which you can tweak any way you like, as parameter 'info' provides all the
// necessary details.
//
// see: https://github.com/vitaly-t/pg-monitor#log
monitor.log = function (msg, info) {

    // In a PROD environment we will only receive event 'error',
    // because this is how we set it up below.

    // And the condition below is for DEV environment only,
    // as we want to log errors only, or else the file will grow
    // out of proportion in no time, and become quite useless.

    if (info.event === 'error') {

        var logText = msg + os.EOL; // next error message + line break;

        if (info.time) {
            // If it is a new error being reported,
            // and not an additional error line;

            logText += os.EOL; // append another line break;
        }

        fs.appendFile(logFile, logText, function (err) {
            if (err) {
                // Error writing into the log file;
                console.log("Logging Error:", err);
            }
        });
    }

    // We absolutely must not let the monitor write anything into the console
    // while in a PROD environment, and not just because nobody will be able
    // to see it there, but mainly because the console is incredibly slow and
    // hugely resource-consuming, suitable only for debugging.

    if (!$DEV) {

        // If it is not a DEV environment:

        info.display = false; // display nothing;
    }

};

var attached = false;

module.exports = function (options) {

    // We are checking to avoid calling 'attach' more than once,
    // without calling 'detach', as it will throw an error;

    if (attached) {
        return; // shouldn't call it more than once;
    }
    attached = true;

    if ($DEV) {

        // In a DEV environment, we attach to all supported events:

        monitor.attach(options);

    } else {

        // In a PROD environment, let's attach only to event 'error':

        monitor.attach(options, ['error']);
    }

};
