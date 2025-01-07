import * as dynamoose from 'dynamoose';

const schema = new dynamoose.Schema(
  {
    email: {
      type: String,
      required: true,
      hashKey: true,
    },
    password: String,
  },
  { timestamps: true },
);

export const UserModel = dynamoose.model('User', schema, {
  prefix: 'Foodies-Dev-',
});
