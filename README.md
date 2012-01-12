seeperf
=======

Exploratory browser/canvas-based graphing.

Usage
-----

First, run the included mini-webserver...

    $ ./web.js 
    web.js - serving http://localhost:8888

Next, in a separate console, process the data.

    ./cook.js <directory-0> ... <directory-N> > output.html

Then, open a web browser to "http://localhost:8888/output.html".

Example
-------

For example, you might have performance data in JSON files,
spread across directories that look like...

    data/data-1.7.2r-22
    data/data-1.7.2r-22/bucket-size.txt
    data/data-1.7.2r-22/data-size.txt
    data/data-1.7.2r-22/dispatcher.txt
    data/data-1.7.2r-22/latency-delete-recent.txt
    data/data-1.7.2r-22/latency-delete.txt
    data/data-1.7.2r-22/latency-get-recent.txt
    data/data-1.7.2r-22/latency-get.txt
    data/data-1.7.2r-22/latency-set-recent.txt
    data/data-1.7.2r-22/latency-set.txt
    data/data-1.7.2r-22/membasestats.txt
    data/data-1.7.2r-22/ns_server_data.txt
    data/data-1.7.2r-22/ops.txt
    data/data-1.7.2r-22/systemstats.txt
    data/data-1.7.2r-22/timings.txt
    data/data-1.8.0r-55
    data/data-1.8.0r-55/bucket-size.txt
    data/data-1.8.0r-55/latency-delete-recent.txt
    data/data-1.8.0r-55/latency-delete.txt
    data/data-1.8.0r-55/latency-get-recent.txt
    data/data-1.8.0r-55/latency-get.txt
    data/data-1.8.0r-55/latency-set-recent.txt
    data/data-1.8.0r-55/latency-set.txt
    data/data-1.8.0r-55/ns_server_data.txt
    data/data-1.8.0r-55/ns_server_data_system.txt
    data/data-1.8.0r-55/ops.txt
    data/data-1.8.0r-55/systemstats.txt

TIP: The JSON files don't need to have a *.json suffix.

So, you would run...

    ./cook.js data/data-* > out.html

TIP: During development/debugging, to see progress and auto-open a browser (on OSX)...

    ./cook.js data/data-* | tee out.html && open http://localhost:8888/out.html

The browser page uses AJAX calls to the web.js server whenever
more data is required for graphing.

