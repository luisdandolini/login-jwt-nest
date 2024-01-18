import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValue = await bcrypt.compareSync(password, user.password);

      if (isPasswordValue) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Email ou senha inválidos');
  }
}
