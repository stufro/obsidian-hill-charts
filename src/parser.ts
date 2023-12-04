import { parse } from 'yaml'

function parseCodeBlock(input: string) {
  return parse(input)["points"]
}

export { parseCodeBlock }