import { Module } from '@nestjs/common';
import { InvalidConfigurationException } from 'src/interface/InvalidConfigurationException';
import * as process from 'node:process';

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

    const configs = {
      POSTGRES_HOST: process.env.POSTGRES_HOST,
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DATABASE: process.env.POSTGRES_DB,
      INFLUXDB_TOKEN: process.env.INFLUXDB_TOKEN,
      INFLUXDB_URL: process.env.INFLUXDB_URL,
      ALERT_EMAIL: process.env.ALERT_EMAIL,
      ALERT_EMAIL_PASSWORD: process.env.ALERT_EMAIL_PASSWORD,
    };
    const invalidProps: string[] = [];
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
