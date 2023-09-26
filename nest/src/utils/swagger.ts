import { ApiQueryOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ErrorModel } from './exception';
import { HttpStatusMessages, httpStatusMessages } from './http-status';

type SwaggerError = {
  status: number;
  route: string;
  message?: string | unknown;
  description?: string;
};

type SwaggerText = {
  status: number;
  text: string | unknown;
  description?: string;
};

type SwaggerJSON = {
  status: number;
  json: unknown;
  description?: string;
};

export const Swagger = {
  defaultResponseError({
    status,
    route,
    message,
    description,
  }: SwaggerError): ApiResponseOptions {
    return {
      schema: {
        example: {
          error: {
            code: status,
            message: [
              message,
              httpStatusMessages[String(status) as keyof HttpStatusMessages],
            ].find(Boolean),
            traceid: '<traceid>',
            timestamp: '<timestamp>',
            path: route,
          },
        } as ErrorModel,
      },
      description,
      status,
    };
  },

  defaultResponseText({
    status,
    text,
    description,
  }: SwaggerText): ApiResponseOptions {
    return {
      content: {
        'text/plain': {
          schema: {
            example: text,
          },
        },
      },
      description,
      status,
    };
  },

  defaultResponseJSON({
    status,
    json,
    description,
  }: SwaggerJSON): ApiResponseOptions {
    return {
      content: json
        ? {
            'application/json': {
              schema: {
                example: json,
              },
            },
          }
        : undefined,
      description,
      status,
    };
  },

  defaultRequestJSON(json: unknown): ApiResponseOptions {
    return {
      schema: {
        example: json,
      },
    };
  },

  defaultApiQueryOptions({
    example,
    name,
    required,
    description,
  }: ApiQueryOptions): ApiQueryOptions {
    return {
      schema: { example },
      required,
      name,
      description,
      explode: true,
      type: 'string',
    };
  },
};
