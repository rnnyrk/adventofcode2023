const path = "./day-2-input.txt";
const file = Bun.file(path);

const text = await file.text();
const lines = text.split("\n");

const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;

const validGameNumbers = lines
  .map(line => {
    const [gameId, cubes] = line.split(':')
    const cubesPerRound = cubes.split(';');

    const isValidGame = cubesPerRound
      .map((round) => {
          const values = round.split(',');

          let redCubes = 0;
          let greenCubes = 0;
          let blueCubes = 0;

          values.forEach((value) => {
            const amount = Number(value.trim().match(/\d+/));
            
            if (value.includes('red')) {
              redCubes += amount;
            } else if (value.includes('green')) {
              greenCubes += amount;
            } else if (value.includes('blue')) {
              blueCubes += amount;
            }
          })

          if (redCubes > maxRedCubes || greenCubes > maxGreenCubes || blueCubes > maxBlueCubes) {
            return false;
          }

          return true;
      })

    if (!isValidGame.includes(false)) {
      return Number(gameId.match(/\d+/));
    }

    return false;
  })
  .filter(Boolean) as number[];

let sum = 0;

for (let i = 0; i < validGameNumbers.length; i++ ) {
  sum += validGameNumbers[i];
}
