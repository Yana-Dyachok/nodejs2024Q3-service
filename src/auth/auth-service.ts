import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private users: { login: string; password: string; refreshToken?: string }[] =
    [];

  constructor(private readonly configService: ConfigService) {}

  async signup(login: string, password: string): Promise<string> {
    const saltRounds = Number(this.configService.get('CRYPT_SALT')) || 10;
    if (isNaN(saltRounds) || saltRounds <= 0) {
      throw new Error('Invalid salt rounds configuration');
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userExists = this.users.find((user) => user.login === login);
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    this.users.push({ login, password: hashedPassword });
    return 'User created successfully';
  }

  async login(
    login: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = this.users.find((user) => user.login === login);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateToken(user.login, 'ACCESS');
    const refreshToken = this.generateToken(user.login, 'REFRESH');
    user.refreshToken = refreshToken;

    return { accessToken, refreshToken };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const secret = this.configService.get<string>(
        'JWT_SECRET_REFRESH_KEY',
        'default_refresh_secret',
      );
      const payload = jwt.verify(refreshToken, secret) as { login: string };

      const user = this.users.find(
        (u) => u.login === payload.login && u.refreshToken === refreshToken,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = this.generateToken(user.login, 'ACCESS');
      const newRefreshToken = this.generateToken(user.login, 'REFRESH');
      user.refreshToken = newRefreshToken;

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateToken(login: string, type: 'ACCESS' | 'REFRESH'): string {
    const secretKey =
      type === 'ACCESS'
        ? this.configService.get<string>(
            'JWT_SECRET_KEY',
            'default_access_secret',
          )
        : this.configService.get<string>(
            'JWT_SECRET_REFRESH_KEY',
            'default_refresh_secret',
          );

    const expiresIn =
      type === 'ACCESS'
        ? this.configService.get<string>('TOKEN_EXPIRE_TIME', '1h')
        : this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME', '7d');

    return jwt.sign({ login }, secretKey, { expiresIn });
  }
}
