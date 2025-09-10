export class UploadResponseDto {
  url!: string;
  headers!: Record<string,string>;
  blobPath!: string;
  expiresAt!: string;
}