const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const { schema, root } = require('./controllers/index');

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
