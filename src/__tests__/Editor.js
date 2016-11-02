import React from 'react';
import ReactDOM from 'react-dom';
import Editor from '../Editor';
let ed = new Editor;
it('detect URL ', () => {
  expect(ed.detectURL("my www.daum.net ")).toEqual(["www.daum.net"]);
  expect(ed.detectURL("http://www.naver.com is 지식인 www.mlbpark.com")).toEqual(["http://www.naver.com"]);
  expect(ed.detectURL("www.naver.com is 지식인 http://www.mlbpark.com")).toEqual(["http://www.mlbpark.com"]);
});

// it('hasValue ',()=>{
//   expect(ed.hasValue("1")).toEqual(true);
// });
