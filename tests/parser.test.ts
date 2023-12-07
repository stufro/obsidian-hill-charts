import { parseCodeBlock } from "../src/parser"

describe('parseCodeBlock', () => {
  test('parses the code block into an object', async () => {
    const yaml = `points:
                    - position: 50
                      color: red
                      text: Foo
                    - position: 20
                      color: blue`

    expect(parseCodeBlock(yaml)).toEqual([
      { position: 50, color: "red", text: "Foo" },
      { position: 20, color: "blue" },
    ])
  });
});
