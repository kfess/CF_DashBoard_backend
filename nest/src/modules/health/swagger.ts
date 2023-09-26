import { Swagger } from '../../utils/swagger';

export const SwaggerResponse = {
  get: {
    200: Swagger.defaultResponseJSON({
      status: 200,
      json: { message: '<your app> <version> available' },
      description: 'Healthy Status',
    }),
  },
};
