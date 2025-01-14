export class CreatePostRequestDto {
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

export class CreatePostResponseDto {
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
