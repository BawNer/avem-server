import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AudienceService } from '@app/audience/audience.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { CreateAudienceDto } from '@app/audience/dto/createAudience.dto';
import { AudienceResponseInterface } from '@app/audience/types/audienceResponse.interface';
import { DeleteResult } from 'typeorm';
import { AudiencesResponseInterface } from '@app/audience/types/audiencesResponse.interface';

@Controller('audience')
export class AudienceController {
  constructor(private readonly audienceService: AudienceService) {}

  @Get()
  async findAll(@Query() query: any): Promise<AudiencesResponseInterface> {
    const audiences = await this.audienceService.findAll(query);
    return {
      audience: audiences,
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createAudience(
    @Body('audience') createAudienceDto: CreateAudienceDto,
  ): Promise<AudienceResponseInterface> {
    const audience = await this.audienceService.createAudience(
      createAudienceDto,
    );
    return this.audienceService.buildResponse(audience);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateAudience(
    @Body('audience') updateAudienceDto: CreateAudienceDto,
    @Param('id') id: number,
  ): Promise<AudienceResponseInterface> {
    const audience = await this.audienceService.updateAudience(
      updateAudienceDto,
      id,
    );
    return this.audienceService.buildResponse(audience);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteAudience(@Param('id') id: number): Promise<DeleteResult> {
    return await this.audienceService.deleteAudience(id);
  }
}
