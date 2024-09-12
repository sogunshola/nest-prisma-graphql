import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { RegisterUserInput } from './dto/user.dto';
import { UsersService } from './user.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => User)
  async registerUser(@Args('data') data: RegisterUserInput) {
    return this.usersService.create(data);
  }
}
