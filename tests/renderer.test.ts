import { renderHillChart } from "../src/renderer";

describe('renderHillChart', () => {
  test('renders the full SVG', async () => {
    const data = [
      { position: 50, color: "red", text: "Foo" },
      { position: 20, color: "blue" },
    ]
    expect(renderHillChart(data)).toEqual(`
    `)
  });
});
