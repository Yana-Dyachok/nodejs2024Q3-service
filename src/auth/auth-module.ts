import { Module } from '@nestjs/common';
import { AuthService } from './auth-service';
import { AuthController } from './auth-controller';
import { UserService } from 'src/user/user.service';
import { DatabaseModule } from 'src/db/db-module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, DatabaseModule, JwtService],
  exports: [JwtModule],
})
export class AuthModule {}
