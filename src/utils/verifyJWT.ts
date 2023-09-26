import jwt from 'jsonwebtoken';

export const verifyJWT = (token: string): boolean => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return false;
    }

    jwt.verify(token, secret, {
      algorithms: ['HS256'],
    });
    return true;
  } catch (error: unknown) {
    console.error(`Error while verifying JWT: ${error}`);
    return false;
  }
};
