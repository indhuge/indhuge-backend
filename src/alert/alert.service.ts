import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlertService {
  private transporter: nodemailer.Transporter<SentMessageInfo>;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Alert)
    private repo: Repository<Alert>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: configService.get('ALERT_EMAIL'),
        pass: configService.get('ALERT_EMAIL_PASSWORD'),
      },
      port: 587,
      secure: false,
    });
  }

  async sendEmail() {
    const result = await this.transporter.sendMail({
      from: this.configService.get('ALERT_EMAIL'),
      to: 'luanf2003@gmail.com',
      subject: 'Alert test',
      text: 'ALERT',
    });

    return result;
  }

  create(createAlertDto: CreateAlertDto) {
    return this.repo.insert(createAlertDto);
  }

  async findAll() {
    return (await this.repo.find({relations : {device : true}})).map((e) => {
      return {
        ...e,
        target: e.device.id,
        device: undefined
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} alert`;
  }

  update(id: number, updateAlertDto: UpdateAlertDto) {
    return `This action updates a #${id} alert`;
  }

  remove(id: number) {
    return `This action removes a #${id} alert`;
  }
}
