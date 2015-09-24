var parallel = require('run-parallel')
var MultiStream = require('multistream')

module.exports = function (query, searchers, cb) {
  var tasks = []
  for (var i in searchers) {
    (function (i) {
      tasks.push(function (cb) {
        var searcher = searchers[i]
        searcher.search(query, function (err, results) {
          if (err) return cb(err)
          var data = {searcher: searcher.name, results: results}
          cb(null, data)
        })
      })
    })(i)
  }
  parallel(tasks, function (err, results) {
    if (err) return cb(err)
    cb(null, results)
  })
}

module.exports.stream = function (query, searchers, cb) {
  var streams = []
  for (var i in searchers) {
    streams.push(searchers.stream(query))
  }
  return MultiStream(streams)
}
