const path = "./day-2-input.txt";
const file = Bun.file(path);

const text = await file.text();
const lines = text.split("\n");

const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;

// Part 2
const mapHighestNumbersPerColor = lines
  .map(line => {
    const [gameId, cubes] = line.split(':')
    const cubesPerRound = cubes.split(';');

    return cubesPerRound
      .map((round) => {
          const values = round.split(',');

          let redCubes: number[] = [];
          let greenCubes: number[] = [];
          let blueCubes: number[] = [];

          values.forEach((value) => {
            const amount = Number(value.trim().match(/\d+/));

            if (value.includes('red')) {
              redCubes.push(amount)
            } else if (value.includes('green')) {
              greenCubes.push(amount)
            } else if (value.includes('blue')) {
              blueCubes.push(amount)
            }
          })

          const maxRedCubes = redCubes.length > 0 ? Math.max(...redCubes) : 0;
          const maxGreenCubes = greenCubes.length > 0 ? Math.max(...greenCubes) : 0;
          const maxBlueCubes = blueCubes.length > 0 ? Math.max(...blueCubes) : 0;

          return [maxRedCubes, maxGreenCubes, maxBlueCubes];
      })
      .reduce((acc, curr) => {
        if (curr[0] > acc[0]) {
          acc[0] = curr[0];
        }

        if (curr[1] > acc[1]) {
          acc[1] = curr[1];
        }

        if (curr[2] > acc[2]) {
          acc[2] = curr[2];
        }

        return acc;
      }, [0,0,0])
  });

const powerOfNumbers = mapHighestNumbersPerColor.map((value) => {
  return value[0] * value[1] * value[2];
})

let sum2 = 0;
for (let i = 0; i < powerOfNumbers.length; i++ ) {
  sum2 += powerOfNumbers[i];
}

console.log({ part2Sum: sum2 });


// Part 1
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

let sum1 = 0;

for (let i = 0; i < validGameNumbers.length; i++ ) {
  sum1 += validGameNumbers[i];
}

console.log({ part1Sum: sum1 });

