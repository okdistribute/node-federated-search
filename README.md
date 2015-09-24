# node-federated-search

Federated search for Node.js. This tool assumes you have assembled node modules that implement the [abstract-search](http://github/karissa/abstract-search) api.

```
npm install federated-search
```

## Examples
```js
var fedsearch = require('federated-search')

var query = {
  field1: 'hello',
  field2: 'world'
} // something they can all understand

var searchers = [
  require('ckan-searcher'),
  require('github-searcher'),
  require('figshare-searcher')
]
```

Use the streaming API. It's better. Trust me.

```js
var stream = fedsearch(query, searchers)
stream.on('data', function (result) {
  console.log(result)
})
stream.destroy() // will stop fetching data.
```

If you really want, you can search manually. This may or may not work or only return the first few pages, depending on how the searchers are implemented. No guarantees.

```js
fedsearch.search({query: 'some data'}, searchers, function (err, results) {
  console.log(results)
})
```
