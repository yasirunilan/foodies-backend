import { Item } from 'dynamoose/dist/Item';

export interface User extends Item {
  email: string;
  password: string;
  refreshTokens?: string[];
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
}
