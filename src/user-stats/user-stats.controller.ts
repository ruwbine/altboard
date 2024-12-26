import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/users/decorators/user.decorator";
import { IUser } from "src/users/interfaces/user.interface";

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class UserStatsController{

    @Get()
    async getStats(@User() user){
        console.log(user);
        return user;
    }
}