#!/usr/bin/env node

// usage - ./mcsoda-cook.js KEY_FILE
//
// Visualize mcsoda key access pattern.
//
// You can get a KEY_FILE from something like...
//
// ./pytests/performance/mcsoda.py none:// \
//    ratio-sets=0.8 ratio-misses=0.05 ratio-creates=0.1875 ratio-deletes=0.0769 \
//    ratio-hot=0.2 ratio-hot-gets=0.95 ratio-hot-sets=0.95 ratio-expirations=0.025 \
//    max-ops=65000 max-items=100000 hot-shift=200 doc-gen=0 | grep -v : | cut -d ' ' -f 1 -f 2 \
//    > KEY_FILE
//
// See: mcsoda-prep-keys
//
var fs = require("fs");

var o = console.log

o("<html>");
o("<head>");
o('<link rel="stylesheet" href="css/style.css">');
o("</head>");

o("<script>")
o("  var cmds = [")

function process_file(fname) {
  var keys = {};
  var nkeys = 0;

  var text = fs.readFileSync(fname).toString();
  var rows = text.split('\n');
  for (var i in rows) {
    var row = rows[i]; // Looks like: "get keyname".
    var arr = row.split(' ');
    var cmd = arr[0];
    if (cmd.length > 0 && cmd != "echo" && cmd != "first") {
      var key = arr[1].split('\r')[0];
      var ikey = keys[key];
      if (!ikey) {
        nkeys++;
        ikey = keys[key] = nkeys;
      }
      o('["' + cmd + '",' + ikey + '],');
    }
  }
}

process.argv.slice(2).forEach(process_file);

o("  ];")
o("</script>")
o(fs.readFileSync("./mcsoda-body.tmpl.html").toString());
o("</html>")
