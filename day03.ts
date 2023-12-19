const path = "./inputs/day-3-input.txt";
const file = Bun.file(path);

const text = await file.text();
const lines = text.split("\n");

function part1() {
  let total = 0;

  // loop horizontal and vertical lines
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    let numbers = [];
    let match;
    let pattern = /\d+/g;

    // Match all numbers and get their start and end positions / index
    while ((match = pattern.exec(lines[lineIndex])) !== null) {
      numbers.push({ 
        start: match.index, 
        end: pattern.lastIndex, 
        value: match[0] 
      });
    }

    // Loop over all numbers
    for (let number of numbers) {
      let partOfSum = false;

      // For the current line, go 1 line before and 1 line after
      for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
        // For all 3 lines (-1, 0 and 1), loop all character in the line
        for (let x = number.start - 1; x <= number.end; x++) {
          if (y >= 0 && y < lines.length && x >= 0 && lines[lineIndex].length > x) {
            const curData = lines[y][x];

            // If the character close to the number are not a number or a dot, it's part of the sum
            if (isNaN(parseInt(curData)) && curData != '.')  {
              partOfSum = true;
            }
          }
        }
      }

      if (partOfSum) {
        total += parseInt(number.value);
      }
    } 
  }

  return total;
}

function part2() {
  let total = 0;
  let map = []

  // all comments are similar, no sum but a map with all numbers and their position
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    let numbers = [];
    let match;
    let pattern = /\d+/g;

    while ((match = pattern.exec(lines[lineIndex])) !== null) {
      numbers.push({ 
        start: match.index, 
        end: pattern.lastIndex - 1,  
        value: match[0] 
      });
    }

    for (let number of numbers) {
      for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
        for (let x = number.start - 1; x <= number.end + 1; x++) {
          if (y >= 0 && y < lines.length && x >= 0 && lines[lineIndex].length > x) {
            if (lines[y][x] === '*') {
              map.push({ x, y, value: parseInt(number.value) });
            }
          }
        }
      }

    } 
  }

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      let selected = map.filter((value) => value.x === x && value.y === y);
      if (selected.length === 2) {
        let nums = selected.map((value) => value.value);
        total += nums[0] * nums[1];
      }
    }
  }

  return total;
}


console.log({ part1: part1() });
console.log({ part2: part2() });


