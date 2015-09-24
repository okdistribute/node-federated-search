# node-federated-search

Federated search for Node.js. This tool assumes you have assembled node modules that implement the [abstract-search](http://github/karissa/abstract-search) api.

```
npm install federated-search
```

## Example

```js
var fedsearch = require('federated-search')

var query = {
  field1: 'hello',
  field2: 'world'
}

var searchers = [
  require('ckan-searcher')('www.datahub.io'),
  require('github-searcher')('www.github.com'),
  require('figshare-searcher')('www.figshare.com')
]
```

Use the streaming API.

```js
var stream = fedsearch(query, searchers)
stream.on('data', function (result) {
  console.log(result)
})
stream.destroy() // will stop fetching data.
```

Prints (one for each calback)

```json
{
  "searcher": {"name": "ckan", "url": "www.datahub.io", "version": "latest"},
  "data": data...
}
```
