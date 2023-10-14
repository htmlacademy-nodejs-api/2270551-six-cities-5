import { injectable, inject } from 'inversify';
import { LoggerInterface } from '../../../libs/logger/logger.interface.js';
import { AppComponent } from '../../..//types/component.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import CreateUserDto from '../dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import UpdateUserDto from '../dto/update-user.dto.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.mail}`);

    return result.populate('favorites');
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.mail);

    if (existedUser) {
      return existedUser.populate('favorites');
    }

    return this.create(dto, salt);
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(userId).populate('favorites').exec();
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity, types.BeAnObject> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true }).populate('favorites').exec();
  }

  public async findByEmail(mail: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ mail }).populate('favorites');
  }
}
