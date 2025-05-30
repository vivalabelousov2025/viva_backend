import { Controller } from '@nestjs/common';
import { TeamsService } from 'src/teams/teams.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly teamsService: TeamsService) {}
}
