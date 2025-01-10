export interface AWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  endpoint?: string;
  dynamodb: {
    tablePrefixes: string;
  };
  s3: {
    profilePictureBucket: string;
  };
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface Config {
  aws: AWSConfig;
  jwt: JWTConfig;
}
