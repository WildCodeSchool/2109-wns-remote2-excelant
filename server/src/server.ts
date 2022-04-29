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
import Context from './types/context';
import { verifyJwt } from './utils/jwt';
import User from './schema/User/user.schema';

dotenv.config();
async function bootstrap() {
  // Build the schema
  const schema = await buildSchema({
    resolvers,
    dateScalarMode: 'isoDate',
  });

  // Init express
  const port = process.env.PORT || 4000;
  const app = express();
  app.use(cookieParser());

  // Create the apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      const context = ctx;

      if (ctx.req.cookies.accessToken) {
        const user = verifyJwt<User>(ctx.req.cookies.accessToken);
        context.user = user;
      }

      return context;
    },
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
  app.listen({ port }, () => {
    // eslint-disable-next-line no-console
    console.log(
      `App is listening on http://localhost:${port}${server.graphqlPath}`
    );
  });

  // Connect to db
  connectToMongo();
}

bootstrap();
