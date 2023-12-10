import { parseCodeBlock } from "../src/parser"
import { HillChartSettings } from "../src/types";


describe('parseCodeBlock', () => {
  test('parses the code block into an object', async () => {
    const yaml = `points:
                    - position: 50
                      color: red
                      text: Foo
                    - position: 20
                      color: blue`
    const settings: HillChartSettings = {
      chartHeight: 100,
      chartWidth: 200,
      pointSize: 10,
    }

    expect(parseCodeBlock(yaml, settings)).toEqual([
      { position: 50, color: "red", text: "Foo" },
      { position: 20, color: "blue" },
    ])
  });
});
