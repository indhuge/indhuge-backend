import { Module } from '@nestjs/common';
import { InvalidConfigurationException } from 'src/interface/InvalidConfigurationException';

@Module({})
export class InitModule {
  onModuleInit() {
    console.log(`
          
###       #  ## #               ##  
 #  ##  ###  #  ### # # ### ###  #  
 #  # # # #  #  # # # # # # ##   #  
 #  # # ###  #  # # ###  ## ###  #  
###          ##         ###     ##  

`);

    let configs = {
      POSTGRES_HOST: process.env.POSTGRES_HOST,
      POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
      INFLUXDB_TOKEN: process.env.INFLUXDB_TOKEN,
      INFLUXDB_URL: process.env.INFLUXDB_URL,
    };
    let invalidProps: string[] = [];
    Object.keys(configs).forEach((e) => {
      if (configs[e] == undefined) {
        invalidProps.push(e);
      }
    });
    if (invalidProps.length) {
      throw new InvalidConfigurationException(
        'Invalid value of prop: ' + invalidProps.reduce((p, c) => p + ' ' + c),
      );
    }
  }
}
