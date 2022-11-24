import ora, { Ora } from 'ora';

export function generateSpinner(text: string): Ora {
  return ora({
    text,
    spinner: 'soccerHeader',
  });
}
