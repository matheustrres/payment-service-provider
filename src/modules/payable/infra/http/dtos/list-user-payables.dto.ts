import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export enum PayableStatus {
	AVAILABLE = 'paid',
	WAITING_FUNDS = 'waiting_funds',
}

export class ListUserPayablesDto {
	@IsUUID()
	@IsNotEmpty()
	user_id: string;

	@IsEnum(PayableStatus)
	@IsOptional()
	status: PayableStatus;
}
