import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DepositAmount } from 'src/enum/deposit.enum';
export default class DepositDto {
  @ApiProperty({
    description: 'Amount to be deposited',
    type: 'number',
  })
  @IsEnum(DepositAmount, {
    message: 'Amount can either be 5, 10, 20,50 or 100',
  })
  @IsNotEmpty({ message: 'Amount can either be 5, 10, 20,50 or 100' })
  amount: DepositAmount;
}
