import Editor from '../Editor';
let ed = new Editor;
it('detect URL 1', () => {
  expect(ed.detectURL("my www.devpools.kr ")).toEqual("www.devpools.kr");
});
it('detect URL 2', () => {
  expect(ed.detectURL("http://www.devpools.kr 는 www.github.com 의 내용이 전부 궁금하다")).toEqual("http://www.devpools.kr");
});
it('detect URL 3', () => {
  expect(ed.detectURL("www.github.com 에 관해서는 http://www.devpools.kr 이 전문가다")).toEqual("http://www.devpools.kr");
});

it('hasValue 1',()=>{
  expect(ed.hasValue(1)).toEqual(false);
});
it('hasValue 2',()=>{
  expect(ed.hasValue(new Date)).toEqual(false);
});
it('hasValue 3',()=>{
  expect(ed.hasValue("1")).toEqual(true);
});
it('hasValue 4',()=>{
  expect(ed.hasValue()).toEqual(false);
});
