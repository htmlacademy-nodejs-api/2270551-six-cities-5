import { Expose } from 'class-transformer';

export class LoggedUserRdo {
   @Expose()
  public token: string;

   @Expose()
   public email: string;

   @Expose()
   public offerCount: string;

   @Expose()
   public image: string;
}
