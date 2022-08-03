import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to nest-app-one!"', () => {
      const actual = service.getData();
      expect(actual.id).toBeDefined();
      expect(actual.id.length).toEqual(36);
      expect(actual.message).toEqual('Welcome to nest-app-one!');
    });
  });
});
