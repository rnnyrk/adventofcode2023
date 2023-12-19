const path = "./inputs/day-4-input.txt";
const file = Bun.file(path);

const text = await file.text();
const lines = text.split("\n");

function part1() {
  const result = lines.reduce((acc: number, line: string): number => {
    const [, cards] = line.split(": ");
    const [winning, my] = cards.split(" | ");

    const winningNumbers = winning.match(/\d+/g)?.map((n) => parseInt(n));
    const myNumbers = my.match(/\d+/g)?.map((n) => parseInt(n));

    if (!winningNumbers || !winningNumbers.length || !myNumbers || !myNumbers.length) return acc;
    
    const points = myNumbers.filter((n) => winningNumbers.includes(n)).length;
    const score = points === 0 ? 0 : Math.pow(2, points - 1);

    return acc + score;
  }, 0);

  return result;
}

function part2() {
  const cardCount = new Array(lines.length).fill(1);

  lines.forEach((line, index) => {
    const [, cards] = line.split(": ");
    const [winning, my] = cards.split(" | ");

    const winningNumbers = winning.match(/\d+/g)?.map((n) => parseInt(n));
    const myNumbers = my.match(/\d+/g)?.map((n) => parseInt(n));

    if (!winningNumbers || !winningNumbers.length || !myNumbers || !myNumbers.length) return;
    
    const points = myNumbers.filter((n) => winningNumbers.includes(n)).length;
    
    if (points) {
      for (let i = index + 1; i < index + 1 + points; i++) {
        if (cardCount[i]) {
          cardCount[i] += cardCount[index] || 0
        }
      }
    }
  });

  // sum of all card counts
  const result = cardCount.reduce((acc, count) => acc + count, 0);
  return result;
}

console.log({ 
  part1: part1(),
  part2: part2(),
})