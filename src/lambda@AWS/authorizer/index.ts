import {
  APIGatewayTokenAuthorizerEvent,
  CustomAuthorizerResult,
} from 'aws-lambda';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  // authorization header から code を取得
  const code = event.authorizationToken;
};
