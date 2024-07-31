import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AppService } from './app.service';

@Controller()
export class AppController {

  ben1 = { 'id': '1', 'nickname': 'Oussama Abdallah', 'mobileNumber': '+97156733383' };
  ben2 = { 'id': '2', 'nickname': 'Yasser Haddadi', 'mobileNumber': '+97156733383' };
  ben3 = { 'id': '3', 'nickname': 'Naim Haddadi', 'mobileNumber': '+97188833383' };
  constructor(private readonly appService: AppService,
  ) {

    this.beneficiaries.push(this.ben1)
    this.beneficiaries.push(this.ben2)
    this.beneficiaries.push(this.ben3)
  }


  users = [
    {
      'username': 'user1',
      'info': {
        'token': randomUUID(),
        'refresh_token': randomUUID(),
        'is_verified': true,
        'balance': 8123.5, 
        'firstName': 'Oussama',
        'lastName': 'Abdallah',
        'transactions': [
          { 'transaction_id': '11', 'beneficiary': this.ben1, 'amount': 100, 'currency': 'AED'},
          { 'transaction_id': '12', 'beneficiary': this.ben2, 'amount': 10, 'currency': 'AED'},
          { 'transaction_id': '13', 'beneficiary': this.ben1, 'amount': 50, 'currency': 'AED'},
          { 'transaction_id': '14', 'beneficiary': this.ben1, 'amount': 100, 'currency': 'AED'},
          { 'transaction_id': '15', 'beneficiary': this.ben1, 'amount': 20, 'currency': 'AED'},
        ]
      }
    },
    {
      'username': 'user2',
      'info': {
        'token': randomUUID(),
        'refresh_token': randomUUID(),
        'is_verified': false,
        'firstName': 'Yasser',
        'lastName': 'Abdallah',
        'balance': 5238.5, 
        'transactions': [
          { 'transaction_id': '111111', 'beneficiary': this.ben1, 'amount': 100, 'currency': 'AED'},
          { 'transaction_id': '111111', 'beneficiary': this.ben1, 'amount': 100, 'currency': 'AED'},
          { 'transaction_id': '111111', 'beneficiary': this.ben1, 'amount': 100, 'currency': 'AED'},
          { 'transaction_id': '111111', 'beneficiary': this.ben2, 'amount': 100, 'currency': 'AED'},
          { 'transaction_id': '111111', 'beneficiary': this.ben3, 'amount': 100, 'currency': 'AED'},
          { 'transaction_id': '111111', 'beneficiary':this.ben1, 'amount': 100, 'currency': 'AED'},
          { 'transaction_id': '111111', 'beneficiary': this.ben2, 'amount': 100, 'currency': 'AED'},
          { 'transaction_id': '111111', 'beneficiary': this.ben3, 'amount': 100, 'currency': 'AED'}
        ]
      }
    }
  ]

  beneficiaries = [];

  @Post('/login')
  login(@Body() body) {
    return this.users.find((user) => user.username == body.username).info
  }


  @Post('/beneficiary')
  addBeneficiary(@Body() body) {
    let ben = { 'id': (this.beneficiaries.length + 1).toString(), 'nickname': body.nickname, 'mobileNumber': body.mobileNumber }
    this.beneficiaries.push(ben)
    return ben;
  }

  @Get('/beneficiary')
  getBeneficiaries() {
    return {
      "beneficiaries": this.beneficiaries
    };
  }

  @Post('/topup')
  async topup(@Body() body)  {
    console.log(body);
    await new Promise(r => setTimeout(r, 2000));
    let beneficiaryObject = this.beneficiaries.find((b, index)=> b.id  ==  body.beneficiaryId);
    console.log(beneficiaryObject);
    return { 'transaction_id': '111111', 'beneficiary': beneficiaryObject, 'amount': body.amount, 'currency': 'AED'};
  }

}
