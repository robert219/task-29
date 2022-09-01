import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    RegistrationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      debug: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
