import { NgParselPipe } from '../../parser/pipe/pipe.model.js';

export interface NgParselPipeStats {
  standalone: number;
  pure: number;
  total: number;
}

export function convertToPipeStats(pipeStats: NgParselPipe[]): NgParselPipeStats {
  return pipeStats.reduce(
    (acc: NgParselPipeStats, pipe) => {
      if (pipe.standalone) {
        acc.standalone = acc.standalone + 1;
      }
      if (pipe.pure) {
        acc.pure = acc.pure + 1;
      }
      acc.total = acc.total + 1;
      return acc;
    },
    {
      standalone: 0,
      pure: 0,
      total: 0,
    }
  );
}
