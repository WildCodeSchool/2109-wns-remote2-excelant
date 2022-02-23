import { gql } from "@apollo/client";

export default class GqlRequest {
  schema: string;

  constructor(public schemaName: string) {
    this.schema = schemaName;
  }

  get(returnType: string) {
    return gql`
    query {
        findAll${this.schema}s {
          ${returnType}
        }
      }`;
  }

  getOne(returnType: string) {
    return gql`
      query findOne${this.schema}($input: FindOne${this.schema}Input) { 
          findOne${this.schema}(input: $input) {
              ${returnType}
          }
      }
      `;
  }

  create(returnType: string) {
    return gql`
      mutation create${this.schema}($input: Create${this.schema}Input!) {
        create${this.schema}(input: $input) {
          ${returnType}
        }
      }`;
  }

  delete(returnType: string) {
    return gql`
    mutation delete${this.schema}($input: Delete${this.schema}Input!) {
      delete${this.schema}(input: $input) {
        ${returnType}
      }
    }`;
  }
}
