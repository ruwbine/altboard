import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/modules/users/decorators/user.decorator";
import { IUser } from "src/modules/users/interfaces/user.interface";

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class UserStatsController{

    @Get()
    async getStats(@User() user: IUser){
        console.log(user);
        return user;
    }
}