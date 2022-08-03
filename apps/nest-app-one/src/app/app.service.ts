import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
@Injectable()
export class AppService {
  getData(): { message: string; id: string } {
    return { message: 'Welcome to nest-app-one!', id: v4() };
  }
}
