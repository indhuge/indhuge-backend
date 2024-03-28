import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class MetricGateway implements OnGatewayConnection {
  
  handleConnection(client: Socket, ...args: any[]) {
    client.emit('message', {data : 'OK'})
  }
  
  // @SubscribeMessage('message')
  // handleMessage(@ConnectedSocket() client : Socket): string {
  //   client.emit('message', {data : "OK"})
  //   return 'Hello world!';
  // }
}
