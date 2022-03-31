import { mongoose, prop, pre } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from 'type-graphql';

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@ObjectType()
class User {
  @Field(() => ID)
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @prop({ required: true })
  password: string;

  @Field(() => String)
  @prop( { required: true })
  confirmPassword: string;
}

export default User;
