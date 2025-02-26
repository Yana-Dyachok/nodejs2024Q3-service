import { Module } from '@nestjs/common';
import { Database } from './db';

@Module({
  providers: [
    {
      provide: 'DATABASE',
      useValue: Database,
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}
