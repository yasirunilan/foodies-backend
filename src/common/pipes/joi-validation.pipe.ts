import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      const errorMessages = error.details
        .map((detail) => detail.message)
        .join(', ');
      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }
    return value;
  }
}
