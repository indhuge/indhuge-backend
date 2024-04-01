import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { MetricService } from './metric.service';

@WebSocketGateway()
export class MetricGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private metricService : MetricService){}

  handleDisconnect(client: Socket) {
    this.metricService.removeListener(client);
  }
  
  async handleConnection(client: Socket, ...args: any[]) {
    client.emit('message', await this.metricService.getActualAvgAll())
    this.metricService.addListener(client)
  }
  
  // @SubscribeMessage('message')
  // handleMessage(@ConnectedSocket() client : Socket): string {
  //   client.emit('message', {data : "OK"})
  //   return 'Hello world!';
  // }
}
