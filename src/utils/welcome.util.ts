import chalk from 'chalk';

export function printWelcomeMessage(): void {
  console.log(chalk.magenta('===================================='));
  console.log(
    chalk.cyan(`
                      __     __     __     __
                     /  \\  /  \\  /  \\  /  \\
____________________/  __\\/  __\\/  __\\/  __\\___________________________
___________________/  /__/  /__/  /__/  /________________________________
                   | / \\   / \\   / \\   / \\  \\____
                   |/   \\_/   \\_/   \\_/   \\    o \\
                                           \\_____/--< ng-parsel
    `)
  );
}
