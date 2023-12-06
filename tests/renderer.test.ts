import { renderHillChart } from "../src/renderer";

describe('renderHillChart', () => {
  test('renders the full SVG', async () => {
    const data = [
      { percentage: 50, color: "red", text: "Foo" },
      { percentage: 20, color: "blue" },
    ]
    expect(renderHillChart(data)).toEqual(`
    `)
  });
});
