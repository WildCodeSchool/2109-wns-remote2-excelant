import { Field, InputType } from 'type-graphql';

@InputType()
class FindOneTaskById {
  @Field(() => String)
  _id: string;
}

export default FindOneTaskById;
