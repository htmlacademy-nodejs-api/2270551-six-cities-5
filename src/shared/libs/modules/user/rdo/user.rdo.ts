import { Expose } from 'class-transformer';

export default class UserRdo {
  @Expose()
  public mail!: string;

  @Expose()
  public name!: string;

  @Expose()
  public avatarUrl?: string;

  @Expose()
  public type!: string;
}
