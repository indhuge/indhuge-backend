import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MqttModule } from './mqtt/mqtt.module';

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
  await app.listen(3001);


}
bootstrap();
