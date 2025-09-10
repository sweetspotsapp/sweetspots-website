export interface CreateUploadDto {
  filename: string,
  contentType: string;
  size: number;
  folder?: string;
}