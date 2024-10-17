import { capitalize } from "./utils";

describe('utils', ()=>{
  describe("capitalize", ()=>{
    test('capitalizes the first letter in a string', ()=>{
      const string = 'taco cat';
      expect(capitalize(string)).toBe("Taco cat")
    })
  })
})