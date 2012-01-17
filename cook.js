#!/usr/bin/env node

// usage - ./cook.js DATA_DIR [... DATA_DIR]
//
var fs = require("fs");

var ignore = { 'buildinfo.clusterCompatibility': 1,
               'buildinfo.mcdMemoryReserved': 1,
               'buildinfo.mcdMemoryAllocated': 1,
               'buildinfo.memoryFree': 1,
               'buildinfo.memoryTotal': 1,
               'buildinfo.memoryQuota': 1 }

var o = console.log

o("<html>");
o("<head>");
o('<link rel="stylesheet" href="css/style.css">');
o("</head>");

o("<script>")
o("  var path_stat = {")

var path_stat = {}; // Key = path; val = statistics of each path/file.

function process_dir(dir) {
  fs.readdirSync(dir).forEach(function(fname) {
      var path = dir + "/" + fname;
      o("'" + path + "':");

      var json = fs.readFileSync(path);
      var stat = path_stat[path] = {};
      var keys = path_stat[path].keys = {};

      var rows = JSON.parse(json);
      for (var i in rows) {
        var row = rows[i];
        for (var key in row) {
          if (!ignore[key]) {
            var val = row[key];
            var key_stat = keys[key] = keys[key] || {};
            key_stat.count = (key_stat.count || 0) + 1;
            key_stat.type  = (key_stat.type || typeof(val));
            if (key_stat.type == "number") {
              key_stat.min = Math.min(val, key_stat.min || Math.pow(2, 52));
              key_stat.max = Math.max(val, key_stat.max || 0);
            }
          }
        }
      }
      stat.bytes = json.length;
      stat.count = rows.length;

      o(JSON.stringify(stat) + ",")
    });
}

process.argv.slice(2).forEach(process_dir);

o("  };")
o("</script>")
o(fs.readFileSync("./body.tmpl.html").toString());
o("</html>")
