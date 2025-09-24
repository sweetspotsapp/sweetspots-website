// early-users/dto/create-early-user.dto.ts
import { AppVersion } from "./app-version.enum";

export class CreateEarlyUserDto {
  name!: string;
  email!: string;
  appVersion?: AppVersion = AppVersion.Alpha;
}
