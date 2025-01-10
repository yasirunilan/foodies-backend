import { Config } from './config.interface';

export default (): Config => ({
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'ap-south-1',
    dynamodb: {
      tablePrefixes: process.env.TABLE_PREFIXES || 'foodies_dev_',
    },
    s3: {
      profilePictureBucket:
        process.env.PROFILE_PIC_BUCKET || 'foodies-profile-pictures-dev',
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1 days',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7 days',
  },
});
