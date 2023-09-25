export abstract class ISecretAdapter {
  ENV: string;

  PORT: number;

  HOST: string;

  POSTGRES_URL: string;

  JWT_SECRET_KEY: string | undefined;
}
