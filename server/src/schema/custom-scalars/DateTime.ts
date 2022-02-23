import { GraphQLScalarType, Kind } from 'graphql';

const DateTime = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: any) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value: any) {
      console.log('1', value);
      new Date(value)
      console.log('2', new Date(value));

      return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast: any) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
      }
      return null; // Invalid hard-coded value (not an integer)
    },
  });

  export default DateTime;