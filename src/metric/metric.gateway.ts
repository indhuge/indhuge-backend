import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { MetricService } from './metric.service';

@WebSocketGateway({ cors: true })
export class MetricGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private metricService: MetricService) {}

  handleDisconnect(client: Socket) {
    this.metricService.removeListener(client);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    client.emit('message', await this.metricService.getActualAvgAll());
    this.metricService.addListener(client);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    if (data == 'update') {
      client.emit('message', await this.metricService.getActualAvgAll());
    }
    return;
  }
}
