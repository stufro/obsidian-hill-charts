import { parseCodeBlock } from "../src/parser"
import { HillChartSettings } from "../src/types";


describe('parseCodeBlock', () => {
  const settings: HillChartSettings = {
    chartHeight: 100,
    chartWidth: 200,
    pointSize: 10,
    pointOpacity: 0.8
  }

  test('parses the code block into an object', async () => {
    const yaml = `points:
                    - position: 50
                      color: red
                      text: Foo
                    - position: 20
                      color: blue`

    expect(parseCodeBlock(yaml, settings).points).toEqual([
      { position: 50, color: "red", text: "Foo", size: 10, opacity: 0.8 },
      { position: 20, color: "blue", size: 10, opacity: 0.8 },
    ])
  });

  test('overrides the settings with the defined point', () => {
    const yaml = `points:
                    - position: 50
                      color: red
                      text: Foo
                      size: 15
                    - position: 20
                      color: blue`

    expect(parseCodeBlock(yaml, settings).points).toEqual([
      { position: 50, color: "red", text: "Foo", size: 15, opacity: 0.8 },
      { position: 20, color: "blue", size: 10, opacity: 0.8 },
    ])
  })

  test('sets a default color', () => {
    const yaml = `points:
                    - position: 50
                      text: Foo`

    expect(parseCodeBlock(yaml, settings).points?.[0].color || "").toContain("var(--color-")
  })

  test('returns an error object when given invalid yml', () => {
    const yaml = `points:
                    - position: 50
                      text: Foo
                  - wrong_indentation: 5`

    expect(parseCodeBlock(yaml, settings).ok).toBe(false)
    expect(parseCodeBlock(yaml, settings).error).toContain("Parsing Error: A block sequence may not be used as an implicit map key at line 4, column 1")
  })
});
