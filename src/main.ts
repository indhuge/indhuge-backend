import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MqttModule } from './mqtt/mqtt.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = (
    await NestFactory.create(AppModule)
  );
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.MQTT,
  //   options: {
  //     url: process.env.MQTT_URL ?? 'mqtt://localhost:1883',
  //   },
  // });
  // await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Ind[huge]')
    .setDescription('Ind[huge] data processing API')
    .setVersion('1.0')
    // .addTag('Metric', 'Manage device metrics')
    // .addTag('Device', 'Manage devices')
    // .addTag('Alert', 'Manage alerts')
    .addTag('Auth', 'Manage authentication')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);


}
bootstrap();
