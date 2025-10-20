export interface RefreshTokenModel {
  token: string;
  expiresOn: string;
  createdOn: string;
  isPersistent: boolean;
}
