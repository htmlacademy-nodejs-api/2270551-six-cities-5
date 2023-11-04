import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';
import { AuthService } from './auth-service.interface.js';
import { LoggerInterface } from '../../logger/logger.interface.js';
import { AppComponent } from '../../../types/component.enum.js';
import { UserEntity} from '../user/index.js';
import LoginUserDto from '../dto/login-user.dto.js';
import UserService from '../user/default-user.service.js';
import { TokenPayload } from './types/TokenPayload.js';
import { ConfigInterface, RestSchema } from '../../config/index.js';
import { UserNotFoundException, UserPasswordIncorrectException } from './errors/index.js';
import { JWT_ALGORITHM, JWT_EXPIRED } from './auth.constant.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserService,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>
  ) {
  }

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.mail,
      name: user.name,
      id: user.id,
    };

    this.logger.info(`Create token for «${user.mail}»...`);

    return new SignJWT(tokenPayload)
      .setProtectedHeader({alg: JWT_ALGORITHM})
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if(!user) {
      this.logger.warn(`User with email «${dto.email}» not found`);
      throw new UserNotFoundException();
    }

    if(!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for «${dto.email}»`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}

