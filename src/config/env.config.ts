import * as dotenv from 'dotenv';
import * as envVar from 'env-var';

dotenv.config();

export const env = {
  appName: envVar.get('APP_NAME').required().asString(),
  jwtSecret: envVar.get('JWT_SECRET').required().asString(),
  expiresIn: envVar.get('JWT_DURATION').asString() ?? '5 year',
  port: envVar.get('PORT').asInt() ?? 3000,
};
