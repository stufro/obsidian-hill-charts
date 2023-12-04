import { parseCodeBlock } from "../src/parser"
import { readFile } from 'fs/promises';

describe('parseCodeBlock', () => {
  test('parses the code block into an object', async () => {
    await readFixture(`${__dirname}/fixtures/code_block.yml`)
      .then((fixture) => {
        expect(parseCodeBlock(fixture)).toEqual([
          { percentage: 50, color: "red" },
          { percentage: 20, color: "blue" },
        ])
      })
  });
});

async function readFixture(path: string) {
  let data = "";
  try {
    data = await readFile(path, 'utf8');
  } catch (err) {
    console.error(err);
  }

  return data
}