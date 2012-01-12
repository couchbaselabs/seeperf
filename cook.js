#!/usr/bin/env node

var fs = require("fs");

process.argv.slice(2).forEach(function(dir) {
    process_dir(dir);
  });

function process_dir(data_path) {
  var data_files = fs.readdirSync(data_path);

  for (var i in data_files) {
    console.log(data_files[i]);

    var data = fs.readFileSync(data_path + "/" + data_files[i]);
    var json = JSON.parse(data);

    var n = 0;
    var keys = {};
    for (var j in json) {
        n = n + 1;
        var entry = json[j];
        for (var key in entry) {
            var val = entry[key];
            var info = keys[key] = keys[key] || {};
            info.count = (info.count || 0) + 1;
            info.type  = (info.type || typeof(val));
            if (info.type == "number") {
              info.min = Math.min(val, info.min || Math.pow(2, 52));
              info.max = Math.max(val, info.max || 0);
            }
        }
    }

    console.log("  bytes   : " + data.length);
    console.log("  entries : " + n);
    console.log(keys);
  }
}

console.log("DONE")
