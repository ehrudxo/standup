// import FirebaseDao,{post} from '../FirebaseDao'
import firebase from 'firebase'
import FirebaseDao from '../FirebaseDao'
import config from '../config'
import Article from './Article';
var article1 = Article();
var dao = new FirebaseDao(config);
var keys=[];

it('Object assign', function(){
  var article2 = Object.assign({},article1);
  article2.user = "Genji";
  article2.content = "다음";
  article2.cardInfo.url = "http://www.daum.net";
  //article1의 값이 잘 전달되었는지 확인.
  expect(article1.cardInfo.imgWidth).toEqual(article2.cardInfo.imgWidth);
})
// it('list article', ()=>{
//   dao.list(25,(articles)=>{
//     articles.forEach((article)=>{
//       keys.push(article.key);
//       var article_v = article.val();
//       expect(article_v.user).toEqual("Genji");
//     })
//   });
// })
var key;
it('upload article and edit',async ()=>{
  key = dao.newKey();
  const promise1 = await dao.update( key, article1 );
  return promise1;
});
it('find and delete',async ()=>{
  const article = await dao.getArticle(key);
  expect(article.key).toEqual(key);
  if(article.key===key){
    dao.remove(key);
  }
});
/* 동기화 문제 때문인지 제대로 동작하지 않는다.
it('remove all ', function(){
  for(let i=0;i<keys.length;i++){
    dao.remove(keys[i]);
  }
})
*/
