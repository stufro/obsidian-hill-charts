import { parseCodeBlock } from "../src/parser"
import { readFile } from 'fs/promises';

describe('parseCodeBlock', () => {
  test('parses the code block into an object', async () => {
    const yaml = `points:
                    - percentage: 50
                      color: red
                      text: Foo
                    - percentage: 20
                      color: blue`

    expect(parseCodeBlock(yaml)).toEqual([
      { percentage: 50, color: "red", text: "Foo" },
      { percentage: 20, color: "blue" },
    ])
  });
});
