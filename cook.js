#!/usr/bin/env node

var fs = require("fs");

var map_to_json = {}; // Key = path; val = json string.
var map_to_info = {}; // Key = path; val = keys info.

function process_dir(dir) {
  fs.readdirSync(dir).forEach(function(fname) {
      var path = dir + "/" + fname;
      console.log(path);

      var json = map_to_json[path] = fs.readFileSync(path);
      var info = map_to_info[path] = {};
      var keys = map_to_info[path].keys = {};

      var rows = JSON.parse(json);
      for (var i in rows) {
        var row = rows[i];
        for (var key in row) {
          var val = row[key];
          var key_info = keys[key] = keys[key] || {};
          key_info.count = (key_info.count || 0) + 1;
          key_info.type  = (key_info.type || typeof(val));
          if (key_info.type == "number") {
            key_info.min = Math.min(val, key_info.min || Math.pow(2, 52));
            key_info.max = Math.max(val, key_info.max || 0);
          }
        }
      }
      info.count = rows.length;

      console.log("  bytes   : " + json.length);
      console.log(info);
    });
}

process.argv.slice(2).forEach(process_dir);

console.log("DONE")
