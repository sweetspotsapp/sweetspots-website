import { api } from "../client";
import { ApiResponse } from "../pagination.dto";
import { CreateUploadDto } from "@/dto/upload/create-upload.dto";
import { UploadResponseDto } from "@/dto/upload/upload-response.dto";

export const getUploadSas = async (data: CreateUploadDto): Promise<ApiResponse<UploadResponseDto>> => {
  const res = await api.post('/upload/sas', data);
  return res.data;
}

export const getReadSas = async (blobPath: string): Promise<ApiResponse<{ url: string }>> => {
  const res = await api.post('/upload/read-sas', { blobPath });
  return res.data;
}