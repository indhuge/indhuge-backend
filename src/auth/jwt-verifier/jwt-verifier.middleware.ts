import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtVerifierMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {

    const inputSub = req.body.sub;

    if(!inputSub) {
      throw new HttpException('User sub missing', HttpStatus.BAD_REQUEST);
    }

    const authorization = req.headers.authorization || '';
    if(!authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const token = authorization.replace('Bearer ', '');
    const verifier = CognitoJwtVerifier.create({
      userPoolId : process.env.AWS_COGNITO_USER_POOL_ID,
      tokenUse: 'access',
      clientId: process.env.AWS_COGNITO_CLIENT_ID,
    });
    try {
      const decoded = await verifier.verify(token);
      const resp = {
        id: decoded.sub,
        username: decoded.username,
        scope : decoded.scope
      }
      if(resp.id !== inputSub) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      
    }catch(err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
