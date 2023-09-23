export const checkEnvVars = (): void => {
  if (!process.env.GITHUB_CLIENT_ID) {
    throw new Error('GITHUB_CLIENT_ID is not defined');
  }
  if (!process.env.GITHUB_CLIENT_SECRET) {
    throw new Error('GITHUB_CLIENT_SECRET is not defined');
  }
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
};
