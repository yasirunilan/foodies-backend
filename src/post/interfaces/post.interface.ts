import { Item } from 'dynamoose/dist/Item';

export interface Post extends Item {
  id: number;
  title: string;
  content: string;
  author: string;
  pictureKeys?: string[];
  location?: {
    name: string;
    latitude?: number;
    longitude?: number;
  };
}
