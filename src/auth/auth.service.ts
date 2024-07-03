import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AdminInitiateAuthCommand,
  AuthFlowType,
  AdminRespondToAuthChallengeCommand,
  CognitoIdentityProviderClient,
  ChallengeNameType,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  InvalidPasswordException,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { ForgotPasswordDTO } from './dto/forgetPassword.dto';
import { ConfirmForgotPasswordDTO } from './dto/confirmForgotPassword.dto';
import { RefreshTokensDTO } from './dto/refreshTokens.dto';

@Injectable()
export class AuthService {
  private readonly client: CognitoIdentityProviderClient;

  constructor() {
    this.client = new CognitoIdentityProviderClient({});
  }

  async adminAuth(username: string, password: string) {
    const command = new AdminInitiateAuthCommand({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID as string,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID as string,
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    const response = await this.client.send(command);
    return response;
  }

  async respondMfa(username: string, code: string, session: string) {
    const command = new AdminRespondToAuthChallengeCommand({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID as string,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID as string,
      ChallengeName: ChallengeNameType.SOFTWARE_TOKEN_MFA,
      ChallengeResponses: {
        USERNAME: username,
        SOFTWARE_TOKEN_MFA_CODE: code,
      },
      Session: session,
    });

    const response = await this.client.send(command);
    return response;
  }

  async refreshSession(refreshToken: RefreshTokensDTO) {
    try {

      const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken.refreshToken,
        },
        ClientId : process.env.AWS_COGNITO_CLIENT_ID as string,
      });
      const response = await this.client.send(command);
      return response;
    }
    catch (error: any) {
      throw new HttpException({status: HttpStatus.BAD_REQUEST, message: error.message}, 400);
    }
  }

  async forgetPassword(param: ForgotPasswordDTO) {
    const command = new ForgotPasswordCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID as string,
      Username: param.username,
    });
    const response = await this.client.send(command);
    return response;
  }

  async confirmForgotPassword(
    param : ConfirmForgotPasswordDTO
  ) {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID as string,
      Username: param.username,
      ConfirmationCode: param.code,
      Password: param.newPassword,
    });
    try {
      const result = await this.client.send(command);
      return result;
    }
    catch (error: any) {
      if(error instanceof InvalidPasswordException) {
        throw new HttpException({status: HttpStatus.BAD_REQUEST, message: error.message}, 400);
      }
    }
  }

  async test() {
    return 'Hello World';
  }
}
