import { Injectable } from '@nestjs/common';
import {
  AdminInitiateAuthCommand,
  AuthFlowType,
  AdminRespondToAuthChallengeCommand,
  CognitoIdentityProviderClient,
  ChallengeNameType,
} from '@aws-sdk/client-cognito-identity-provider';

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
}
