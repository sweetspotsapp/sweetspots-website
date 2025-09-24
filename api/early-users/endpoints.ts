import { api } from '../client';
import { ApiResponse } from '../pagination.dto';
import { CreateEarlyUserDto } from '@/dto/early-users/create-early-user.dto';

export const createEarlyUser = async (
  data: CreateEarlyUserDto
): Promise<ApiResponse<any>> => {
  const res = await api.post('/early-users', data);
  return res.data;
};
