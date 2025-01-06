import type { Schema } from '../../data/resource';

type Handler = Schema['sayHello']['functionHandler'];

export const handler: Handler = async (event) => {
  const { name } = event.arguments;

  return {
    message: `HeRllo, ${name}!`,
  };
};
