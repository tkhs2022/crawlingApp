///////////////////////////////////////////////////////////////// 
// TEST
const sum = require('./testTarget');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
///////////////////////////////////////////////////////////////// 
// ContentsList.js
///////////////////////////////////////////////////////////////// 
const contentsJS = require('../src/data/ContentsList.js');
const contentsJson = require('../src/data/contents/contents.json');
const Contents = new contentsJS();
///////////////////////////////////////////////////////////////// 
// クローリングリスト新規登録処理
test("Contents.getContentsList", () => {
  const result = Contents.getContentsList("contents.json");
  expect(result).toEqual(contentsJson);
});