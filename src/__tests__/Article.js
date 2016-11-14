export default function getArticle(
  user = "Genji",
  content = "겐지가 함께한다.",
  url = "https://namu.wiki/w/%EA%B2%90%EC%A7%80(%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98)",
  title="겐지(오버워치)",
  description = "블리자드 엔터테인먼트 사의 FPS 게임 오버워치의 영웅.기계가 되어버린 몸을 받아들여 내면의 평화를 찾은 강력한 사이보그 닌자.",
  thumbnail_url = "https://image-proxy.namuwikiusercontent.com/r/http%3A%2F%2Fi66.tinypic.com%2F10mpje9.jpg" ,
  thumbnail_width = 80,
  thumbnail_height =80,
  provider_name = "namu wiki"
){
  return {
    user : user,
    content : content,
    cardInfo:{
      url : url,
      title:title,
      description : description,
      thumbnail_url : thumbnail_url,
      thumbnail_width : thumbnail_width,
      thumbnail_height :thumbnail_height,
      provider_name : provider_name
    }
  }
}
