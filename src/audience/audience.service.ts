import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudienceEntity } from '@app/audience/audience.entity';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { CreateAudienceDto } from '@app/audience/dto/createAudience.dto';
import { AudienceResponseInterface } from '@app/audience/types/audienceResponse.interface';

@Injectable()
export class AudienceService {
  constructor(
    @InjectRepository(AudienceEntity)
    private readonly audienceRepository: Repository<AudienceEntity>,
  ) {}

  async findAll(query: any): Promise<AudienceEntity[]> {
    const queryBuilder = getRepository(AudienceEntity)
      .createQueryBuilder('audience')
      .leftJoinAndSelect('audience.events', 'events');

    if (query.audience) {
      queryBuilder.andWhere('audience.audience = :audience', {
        audience: query.audience,
      });
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    const audiences = await queryBuilder.getMany();

    return audiences;
  }

  async createAudience(
    createAudienceDto: CreateAudienceDto,
  ): Promise<AudienceEntity> {
    const audience = await this.audienceRepository.findOne({
      audience: createAudienceDto.audience,
    });

    if (audience) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newAudience = new AudienceEntity();
    Object.assign(newAudience, createAudienceDto);
    return await this.audienceRepository.save(newAudience);
  }

  async updateAudience(
    updateAudienceDto: CreateAudienceDto,
    id: number,
  ): Promise<AudienceEntity> {
    const audience = await this.audienceRepository.findOne(id);
    if (!audience) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    Object.assign(audience, updateAudienceDto);
    return await this.audienceRepository.save(audience);
  }

  async deleteAudience(id: number): Promise<DeleteResult> {
    const audience = await this.audienceRepository.findOne(id);
    if (!audience) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.audienceRepository.delete(id);
  }

  buildResponse(audience: AudienceEntity): AudienceResponseInterface {
    return {
      audience,
    };
  }
}
