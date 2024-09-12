import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  bioMetricKey?: string;
}

@InputType()
export class BiometricLoginInput {
  @Field()
  email: string;

  @Field()
  biometricKey: string;
}
