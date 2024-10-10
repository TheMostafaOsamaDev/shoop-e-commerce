import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

/*
  +------------+--------------+------+-----+-----------------------+-------+
| Field      | Type         | Null | Key | Default               | Extra |
+------------+--------------+------+-----+-----------------------+-------+
| id         | char(36)     | NO   | PRI | NULL                  |       |
| email      | varchar(255) | NO   | UNI | NULL                  |       |
| username   | varchar(255) | NO   |     | NULL                  |       |
| role       | varchar(255) | NO   |     | admin                 |       |
| deletedAt  | datetime     | YES  |     | NULL                  |       |
| lastLogin  | datetime     | YES  |     | NULL                  |       |
| lastLogout | datetime     | YES  |     | NULL                  |       |
| createdAt  | datetime     | NO   |     | NULL                  |       |
| updatedAt  | datetime     | NO   |     | NULL                  |       |
| avatar     | varchar(255) | YES  |     | admin_user_avatar.png |       |
+------------+--------------+------+-----+-----------------------+-------+
*/

export class AdminDto extends PickType(UserDto, [
  'email',
  'username',
  'avatar',
  'lastLogin',
  'id',
]) {
  @ApiProperty({
    example: 'admin',
    type: String,
  })
  role: string;

  @ApiProperty({
    example: '2021-09-06T07:00:00.000Z',
    type: Date,
  })
  deletedAt: Date;

  @ApiProperty({
    example: '2021-09-06T07:00:00.000Z',
    type: Date,
  })
  lastLogout: Date;
}
