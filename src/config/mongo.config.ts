import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configServise: ConfigService,
): Promise<TypegooseModuleOptions> => ({
  uri: configServise.get<string>('MONGO_URL'),
});
