import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    type: String,
    description: 'Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMWZkZjMwNS04ZmE5LTQ0ZjQtYjZkNy1jOWRmYjVlMTEzODkiLCJsb2dpbiI6IllhbmExMjMiLCJpYXQiOjE3MzI3MTIyMTgsImV4cCI6MTczMjcxNTgxOH0.tsLRdcUBcsoF79-Wg4KX2lAF0_fFpQqiAHQ0gsYHXLA',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
