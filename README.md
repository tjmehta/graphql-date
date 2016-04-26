# graphql-date
GraphQL Date Type

# Installation
```bash
npm i --save graphql-date
```

# Usage
```js
var GraphQLDate = require('graphql-date')

// Use graphql-date in your GraphQL objects for Date properties
var fooType = new GraphQLObjectType({
  name: 'Foo',
  description: 'Some foo type',
  fields: function () {
    created: {
      type: GraphQLDate,
      description: 'Date foo was created'
    },
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    date: {
      type: fooType,
      resolve: function () {
        // ...
      },
    },
  }
})
```

# License
MIT