import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { AuthResponse } from './auth.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.authService.validateUser(email, password);
  }

  @Mutation(() => AuthResponse)
  async biometricLogin(
    @Args('email') email: string,
    @Args('biometricKey') biometricKey: string,
  ) {
    return this.authService.validateBiometric(email, biometricKey);
  }
}
