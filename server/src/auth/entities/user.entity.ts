import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
} from 'sequelize-typescript';
// import { UserRole } from 'src/utils/user-role.enum';
import { generateUsername } from 'src/utils/generate-username';
import { DataTypes } from 'sequelize';

@Table({ timestamps: true })
export class User extends Model {
  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({ allowNull: true, unique: true, type: DataType.STRING })
  username: string;

  @Column({ allowNull: false, type: DataType.STRING })
  name: string;
  @Column({ defaultValue: DataTypes.NOW, type: DataType.DATE })
  lastLogin: Date;

  @Column({ defaultValue: false, type: DataType.BOOLEAN })
  isDeleted: boolean;

  @Column({ defaultValue: 0, type: DataType.INTEGER })
  totalPurchase: number;

  // @Column({
  //   type: DataType.ENUM(...Object.values(UserRole)),
  //   defaultValue: UserRole.USER,
  // })
  // role: string;

  @Column({ defaultValue: 'default_user_avatar.png', type: DataType.STRING })
  avatar: string;

  @BeforeCreate
  static async generateUsername(user: User) {
    user.username = generateUsername(user.name);
  }
}
