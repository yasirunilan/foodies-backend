import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FileUploadSignedUrlResponseDto } from '../dto/fileUploadSignedUrlResponse';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('aws.region'),
      credentials: {
        accessKeyId: this.configService.get<string>('aws.accessKeyId'),
        secretAccessKey: this.configService.get<string>('aws.secretAccessKey'),
      },
    });
  }

  async getFileSignedUrl(
    bucket: string,
    key: string,
  ): Promise<FileUploadSignedUrlResponseDto> {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
    return { url, key };
  }
}
