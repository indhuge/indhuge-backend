import { JwtVerifierMiddleware } from './jwt-verifier.middleware';

describe('JwtVerifierMiddleware', () => {
  it('should be defined', () => {
    expect(new JwtVerifierMiddleware()).toBeDefined();
  });
});
