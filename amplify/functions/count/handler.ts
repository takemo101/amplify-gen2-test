import type { Schema } from '../../data/resource';

type Handler = Schema['count']['functionHandler'];

let count = 0;

export const handler: Handler = async () => {
  count += 1;

  return {
    count,
  };
};
