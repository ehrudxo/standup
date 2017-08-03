import { ARTICLE,ALL } from '../constants'
import FirebaseDao from '../FirebaseDao'
import config from '../config'
import {groupSelect} from './Group'
const dao = new FirebaseDao(config);

export function userArticles() {
  return {
    type: ARTICLE
  }
}
/*
* 여기부터
*/
export function getArticles(articles){
  const items = [];
  articles.forEach(function(article){
    const item = article.val();
    item['key'] = article.key;
    items.push(item);
  })
  if(items && items.length>0){
    return{
      type : ALL,
      articles : items.reverse()
    }
  }
}
export function loadArticles() {
  return (dispatch) => {
    dao.list(25,(articles)=>dispatch(getArticles(articles)));
  };
}

export function updateArticle(postData){
  return (dispatch) => {
    dao.update(dao.newKey(),postData).then(()=>{
      dispatch(groupSelect(postData.groupName));
    });

  };
}
