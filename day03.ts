const path = "./day-3-input.txt";
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

    while ((match = pattern.exec(lines[lineIndex])) !== null) {
      numbers.push({ 
        start: match.index, 
        end: pattern.lastIndex, 
        value: match[0] 
      });
    }

    for (let number of numbers) {
      let partOfSum = false;

      for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
        for (let x = number.start - 1; x <= number.end; x++) {
          if (y >= 0 && y < lines.length && x >= 0 && lines[lineIndex].length > x) {
            const curData = lines[y][x];
            

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

  // loop horizontal and vertical lines
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
          // 
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


