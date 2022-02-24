import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import { buildSchema } from 'type-graphql';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import cookieParser from 'cookie-parser';
import resolvers from './resolvers';
import connectToMongo from './utils/mongo';

dotenv.config();
async function bootstrap() {
  // Build the schema
  const schema = await buildSchema({
    resolvers,
    dateScalarMode: "isoDate",
  });

  // Init express
  const app = express();
  app.use(cookieParser());

  // Create the apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx) => ctx,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  await server.start();

  // apply middleware to server
  server.applyMiddleware({ app });

  // app.listen on express server
  app.listen({ port: 4000 }, () => {
    console.log('App is listening on http://localhost:4000/graphql');
  });

  // Connect to db
  connectToMongo();
}

bootstrap();
