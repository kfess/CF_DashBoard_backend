import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const GITHUB_TOKEN_ENDPOINT = 'https://github.com/login/oauth/access_token';
const GITHUB_API_USER_ENDPOINT = 'https://api.github.com/user';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const code = event.body ? JSON.parse(event.body).code : undefined;

    if (!isCodeValid(code)) {
      throw new Error('Invalid code');
    }

    const tokenResponse = await axios.post(
      GITHUB_TOKEN_ENDPOINT,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' }, timeout: 60000 }
    );

    if (tokenResponse.status !== 200) {
      throw new Error('Failed to retrieve GitHub access token');
    }

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get(GITHUB_API_USER_ENDPOINT, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/json',
      },
      timeout: 60000,
    });

    if (userResponse.status !== 200) {
      throw new Error('Failed to fetch GitHub user data');
    }

    const githubId = userResponse.data.id as number;
    const githubUsername = userResponse.data.login as string;

    const jwtToken = jwt.sign(
      {
        githubId: githubId,
        githubUsername: githubUsername,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': `authToken=${jwtToken}; HttpOnly; SameSite=None; Max-Age=2592000; Secure;`,
      },
      body: JSON.stringify({
        githubId: githubId,
        githubUsername: githubUsername,
        isLoggedIn: true,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};

function isCodeValid(code: string | undefined) {
  const CODE_PATTERN = /^[0-9a-zA-Z]+$/;
  // 存在チェック & 文字数チェック & 文字種チェック (お気持ち程度)
  if (!code || code.length >= 100 || !CODE_PATTERN.test(code)) {
    return false;
  }

  return true;
}
