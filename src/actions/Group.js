/**
 * Created by keen on 2017. 1. 12..
 */
import {GROUP}  from '../constants'
import FirebaseDAO from '../FirebaseDao'
import config  from '../config'

const dao = new FirebaseDAO(config);
export function getArticle(articles,groupName,logoUrl){
  if (articles) {
    let items = Object.keys(articles).map((key) =>articles[key]);
    if (items && items.length > 0) {
      return {
        type: GROUP,
        articles: items.reverse(),
        groupName: groupName,
        logoUrl: logoUrl
      }
    }
  } else {
    return {
      type: GROUP,
      articles: null,
      groupName: groupName,
      logoUrl: logoUrl
    }
  }
}
export function getGroup(groupName, logoUrl){
  return (dispatch) => {
    dao.listGroupArticle(groupName).then((articles)=>dispatch(getArticle(articles,groupName,logoUrl)));
  }
}
export function groupSelect(groupName){
  return (dispatch) => {
    dao.getGroup(groupName).once('value', (snapshot) => {
      let logoUrl = snapshot.val().logoUrl;
      console.log(logoUrl);
      return dispatch(getGroup(groupName,logoUrl));
    })
  }
}
