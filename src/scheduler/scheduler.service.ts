import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {


    @Cron('1 * * * * *')
    importData(){
        
    }

}
