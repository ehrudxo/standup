# Day4

## User Story 2

```
 김개발이 사이트를 방문해서 자신이 어제 유심하게 읽은 글을 올릴 수 있다. 이렇게 하면 다른 사람들이 볼 수 있다.
  * 에디터 창은 하나만 있고 거기서 글을 작성하고 업로드 하면 글이 외부 클라우드 공간에 저장이 된다.
```
계속 하겠습니다.

### Firebase DAO(Data Access Object) 만들기
JavaScript라서 DAO패턴을 좋아하지는 않지만 굳이 이해를 돕기 위해 DAO라는 이름을 명명하고 작업을 하겠
습니다. 인터페이스를 만들고  Implementation 소스를 만드는 작업까지는 굳이 하지 않겠습니다.

#### 테스트 코드를 짜 보자.
일단 Mocking을 할 데이터를 만들어야 하겠죠.

__tests__ 폴더 밑에 CloudDao.js 를 만듭니다.

```JavaScript
//CloudDao.js 파일
var article = {
  user : "Genji",
  content : "겐지가 함께한다.",
  urls:[{
    url : "https://namu.wiki/w/%EA%B2%90%EC%A7%80(%EC%98%A4%EB%B2%84%EC%9B%8C%EC%B9%98)",
    title:"겐지(오버워치)",
    description : "블리자드 엔터테인먼트 사의 FPS 게임 오버워치의 영웅.기계가 되어버린 몸을 받아들여 내면의 평화를 찾은 강력한 사이보그 닌자.",
    imageUrl : "https://image-proxy.namuwikiusercontent.com/r/https%3A%2F%2Fd1u1mce87gyfbn.cloudfront.net%2Fmedia%2Fartwork%2Fgenji-concept.jpg",
    imgWidth: 640,
    imgHeight : 480,
    thumbnailUrl : "https://image-proxy.namuwikiusercontent.com/r/http%3A%2F%2Fi66.tinypic.com%2F10mpje9.jpg" ,
    thumbnailWidth : 80,
    thumbnailHeight :80
  }]
}
```
Mocking을 위한 데이터를 만들어 보겠습니다. 이 데이터가 잘 입력이 되고 수정이 되고 삭제가 되면서 리스트
를 확인하는 작업을 해 보겠습니다.

firebase를 사용하기 위해서 모듈을 설치합니다. 이미 설치된 모듈이 아니기 때문에 다음의 명령어를 사용합니다.

```
$npm install firebase --save
```
#### DAO 만들길
자 이제 Dao를 어떻게 만들면 좋을까요?

먼저 Dao에는 입력, 수정, 삭제, 조회(insert, update, delete, list)는 기본적으로 들어갈 것이고,
한건 검색을 위한  getArticle이 필요할 것입니다. 일단 입력에 관한 유저 스토리 이지만 Dao는 한꺼번에
작성할 수 있는 것은 먼저 작성해 보도록 하겠습니다.

사용자 스토리의 기본 중 하나는 확인할 수 있어야 한다인데, 입력이 되면 조회를 할 수 있어야 하기 때문입니다.

> *여기서 잠깐*
> 사용자 스토리는 INVEST를 기반으로 하는데
> Independent : 독립적이어야 한다
> Negotiable : 조절 가능해야 한다
> Valuable : 사용자에게 가치가 있어야 한다.
> Estimatable : 측정가능해야 한다
> Small : 작아야 한다
> Testable : 테스트 가능해야 한다.
> 우리가 정해 놓은 사용자 스토리를 위에 맞춰 변경하는 작업도 중간 중간 이루어 질 것입니다.

일단 입력을 위한 테스트 코드를 아래와 같이 작성해 보겠습니다.

```JavaScript
it('upload article',function(){
  let inserted = dao.insert( article );
  // 입력이 되었는지 key 값을 가지고 검색해서 확인
  dao.getArticle(key).on('value',(snapShot)=>{
    //키 값이 같은지 테스트 케이스 작성
    expect(snapShot.key).toEqual(key);
  });
  return inserted;
});
```
값을 입력하고 key로 검색을 해서 같은 값을 가지고 있는지 확인해 보는 코드를 넣었습니다.

자, 그러면 여기 기본적으로 DAO 에 insert 와 getArticle 함수를 작성해 보겠습니다.

src 폴더 밑에 FirebaseDao.js 파일을 만듭니다.

```JavaScript
import firebase from 'firebase';
/*
*  initializeFirebaseApp
*/

export default class FirebaseDao {
  constructor(config){
    //firebase remote 서버 정보 셋팅
    firebase.initializeApp(config);
  }
  insert(postData){
    return firebase.database().ref().child('posts').push(postData);
  }
  getArticle(key){
    return firebase.database().ref('/posts/' + key);
  }
}
```

자, 이제 npm test를 실행하면 되는데, 다음의 셋팅을 하지 않으면 데이터 값이 로딩이 되지 않을 것입니다.
firebase는 인증 시스템을 갖고 있는데, 일단 그림과 같이 anonymous가 입력할 수 있도록 해 두고 이후
인증관련 모듈을 같이 붙인 후에 셋팅을 바꿔보도록 하겠습니다.

![Serverless_firebase08](./doc_img/Serverless_firebase08.jpg)

[그림 1]

StandUp-> Database -> 규칙 메뉴를 따라가면 될 듯 합니다.

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

자 이제 npm test 를 실행하고 나면
![Serverless_firebase09](./doc_img/Serverless_firebase09.jpg)

[그림2]

아래와 같은 결과와 함께 외부 firebase 에 저장이 됩니다.

firebase 웹 콘솔에서 확인해 봐야겠죠?

![Serverless_firebase10](./doc_img/Serverless_firebase10.jpg)

[그림3]

그림과 같이 firebase 웹 콘솔에서 Database 의 데이터 탭에서 방금 올린 데이터를 확인할 수 있습니다.

이렇게만 데이터를 쌓아도 되지만 개인화 서비스를 위해 username 기반으로 데이터를 쌓이도록 변경해 보겠습니다.

이런 경우는 key값을 먼저 만들고 같은 key를 가지는 posts와 user-post 데이터 베이스를 만들어야 하는
관계로 update 함수를 작성하도록 하겠습니다. 아직 user 정보를 어떻게 가지고 올지 결정하지 않았으므로
똑같이 genji 폴더에만 작성하도록 하겠습니다.

해당 관련된 테스트 코드는 다음과 같습니다.
```JavaScript
it('upload article and edit and delete',function(){
  //공통 키값
  let key = dao.newKey();
  //입력
  var updated = dao.update( key, article1 );
  dao.getArticle(key).on('value',(snapShot)=>{
    //같은 값이 들어 갔는지 확인
    expect(snapShot.key).toEqual(key);
    //수정
    dao.update(key, article2);
    //삭제. 데이터의 확인을 위해서는 주석 처리.
    dao.remove(key);
  });
  return updated;
});
```
먼저 key 값을 공통으로 만들고, key 값을 기준으로 입력, 수정, 삭제할 수 있습니다.

FirebaseDao 전체 소스는 다음과 같습니다.
```JavaScript
import firebase from 'firebase';
/*
*  initializeFirebaseApp
*/

export default class FirebaseDao {
  constructor(config){
    firebase.initializeApp(config);
  }
  //더 이상 입력에 사용하지 않습니다.
  insert(postData){
    return firebase.database().ref().child('posts').push(postData);
  }
  // 수정
  update(key,postData){
    var updates = {};
    updates['/posts/' + key] = postData;
    updates['/user-posts/genji/' + key] = postData;
    return firebase.database().ref().update(updates);
  }
  // 삭제, delete는 예약어 이므로 remove를 사용
  remove(key){
    firebase.database().ref('/posts/').child(key).remove();
    return firebase.database().ref('/user-posts/genji/').child(key).remove();
  }
  //database에 걸린 이벤트를 종료
  off(){
    return firebase.database().ref().off();
  }
  //새로 빈 데이터를 만들고 key값만 return
  newKey(){
    return firebase.database().ref().child('posts').push().key;
  }
  //한개의 글을 얻어 온다.
  getArticle(key){
    return firebase.database().ref('/posts/' + key);
  }
}
```

자 이제 테스트 코드 하나로 입력-> 수정 -> 삭제를 하는 코드베이스가 완성되었습니다.

### 사용자 스토리2 입력하기

```
업로드 하면 글이 외부 클라우드 공간에 저장이 된다.
```
부분을 위한 테스트 코드와 DAO를 완성했으니 프레젠테이션 레이어와 결합해 보도록 하겠습니다.

지금 에디터에서 글을 쓰고 스탠드업! 버튼을 누를 경우에

![Serverless_firebase11](./doc_img/Serverless_firebase11.jpg)

[그림4]

이루어지는 이벤트는 다음과 같습니다.
```html
<button className="upload"
            disabled={!this.hasValue(this.state.content)}
            onClick={this.handleSubmit}><span>스탠드업!</span></button>
```
이 handleSubmit을 어떻게 작성하면 좋을까요? onClick 이벤트가 호출이 되는 시점부터는 데이터의 영역인데
데이터의 흐름은 한군데서 파악하는 것이 개발을 용이하게 합니다. 게다가 우리는 firebase 처럼 우리가 직접
컨트롤하지 않는 데이터의 흐름을 가지고 있기 때문에 내부의 데이터의 흐름은 App.js 같은 애플리케이션 진입
점으로 위임하는 편이 현명합니다.

그럼 이 "데이터"의 기본 단위가 될 Article 을 우리는 미리 정의했었습니다. 처음에 Mocking을 위한 데이타
라고 한 부분의 article을 반환하는 임시 파일을 만들겠습니다. 이렇게 하는 이유는 테스트의 완결성을 위해서
입니다.

Article.js 라는 파일을 src 폴더 아래에 만들고 테스트 코드는 아래와 같이 작성합니다.
```JavaScript
import Article from '../Article';
var article1 = Article();
it('Object assign', function(){
  var article2 = Object.assign({},article1);
  article2.user = "Genji";
  article2.content = "다음";
  article2.urls[0].url = "http://www.daum.net";
  //article1의 값이 잘 전달되었는지 확인.
  expect(article1.urls[0].imgWidth).toEqual(article2.urls[0].imgWidth);
})
```

왜 이런 작업을 했을까요? 간단히 말씀 드리면 4일차 작업에는 url로 카드를 만들 때 외부에서 URL에 해당하는
메타정보(title, description, thumbnail image)등의 작업을 하지 않기 때문입니다. 그래서 일단은
더미 작업을 하고 이 부분을 카드를 가져오는 방법으로 전환하는 과정을 5일차에 진행하려고 하기 때문입니다.

그런 과정중에 Article의 URL 이외의 부분은 자동으로 채우게 하도록 Mocking 데이타를 활용해서 보도록 하는
것입니다.

자 이제 다시 에디터로 돌아가겠습니다.

![Serverless_firebase12](./doc_img/Serverless_firebase12.jpg)

[그림5]

Editor 안의 state는 보시다시피 embedlyUrl, content 두가지를 설정해 두었습니다.
이 embedlyUrl을 App.js에게 값을 전달해 이후 list 컴포넌트를 만드는 사용자 스토리까지 전달되기 전까지
가 지금의 해결 과제입니다.

[그림 5] 에 묘사가 되어 있듯이 Editor.js 의 handleSubmit은 props 속성으로 App.js와 연결되어
있습니다. handleSubmit event는 App.js의 submit 을 가리키게 되어 있는 것이죠.

그래서 submit 은 Article을 변수로 받아서 firebase 에 저장하는 역할을 하면 됩니다.

App.js의 submit을 아래와 같이 변경해 줍니다.
```JavaScript
import FirebaseDao from './FirebaseDao'
import config from './config'
(중략)
class App extends Component {
  //중략
  constructor(){
    super();
    this.dao = new FirebaseDao(config);
    this.submit = this.submit.bind(this);
  }
  submit(article){
    if(article){
      let key = this.dao.newKey();
      let updated = this.dao.update( key, article );
      return updated;
    }
  }
  //후략
}
```

Editor.js 파일은 아까 언급한 Article.js 를 이용해 handleSubmit을 아래와 같이 작업해 줍니다.
```JavaScript
handleSubmit(event){
  let article = Object.assign({}, Article());
  article.user = "Genji";
  article.content = this.state.content;
  article.urls[0].url = this.state.embedlyUrl;
  this.props.submit(article);
}
```

![Serverless_firebase13](./doc_img/Serverless_firebase13.jpg)

그림과 같이 작성을 하고 업로드를 하면
![Serverless_firebase14](./doc_img/Serverless_firebase14.jpg)

훌륭하게 값이 들어간 것을 확인할 수 있습니다.

이제 입력한 목록만 간단하게 보여지는 것을 보고는 마무리 하겠습니다.

FirebaseDao에 list에 관련된 함수를 추가해 봅시다.

일단 테스트 코드를 아래와 같이 작성해 봅니다
```JavaScript
//__tests__/CloudDao.js
it('list article', function(){
  dao.list(25).once('value',(dataSnapshots)=>{
    dataSnapshots.forEach((dataSnapshot)=>{
      keys.push(dataSnapshot.key);
      var article = dataSnapshot.val();
      expect(article.user).toEqual("Genji");
    })
  });
})
```

DAO 에서 25개까지의 결과만 가지고 와서 데이타의 값을 비교하는 형태이고 콜백함수는 firebase 문서에서 참
조해서 작성했습니다.

```JavaScript
//src/FirebaseDao.js
list(pagesize){
  return firebase.database().ref('/posts/')
          .orderByKey().limitToLast(pagesize);
}
```
위와 같이 작성하면 npm test를 통해 값이 훌륭하게 가져와 있는지 확인할 수 있습니다.

이제 App.js 파일을 고쳐 보겠습니다.

React 컴포넌트의 생명주기에서 mounting 과정은 [그림6] 과 같습니다.

![mounting](./doc_img/mounting.jpg)

[그림6]

componentWillMount 메쏘드를 이용해 데이타 이벤트를 등록합니다.

가지고 온 article들은 상태(state)값에 등록하기 위해 생성자 함수에 먼저 상태값을 등록해 둡니다.

```JavaScript
this.state = {
  articles:[]
}
```

ComponentWillMount와 componentWillUnmount 값을 정의합니다.
```JavaScript
componentWillMount() {
  //데이터 조회 이벤트를 등록합니다.
  this.dao.list(25).on('value',(dataSnapshots)=>{
    var items = [];
    dataSnapshots.forEach(function(dataSnapshot){
      //..중략.. 테스트코드와 같게 작성합니다.
    })
    if(items && items.length>0){
      // state값에 셋팅
      this.setState({
        articles: items.reverse()
      });
    }
  });
}
componentWillUnmount(){
  //이벤트 삭제
  this.dao.off();
}
```

render 메쏘드에도 약간의 변화가 있습니다.
기존의 Editor 에 스프레스 함수를 설명하게 넘긴 수많은 속성(props)은 애플리케이션의 견고성을 위해 필요한
값만 넘기고 firebase에 저장된 목록을 가져오는 작업을 해 보겠습니다.

HTML 에서 목록을 의미하는 태그는 UL, OL입니다. 그 태그를 이용해서 render내의 jsx 는 아래와 같이 작업
해 줍니다

```JavaScript
<Editor submit={this.submit} isAnonymous={this.isAnonymous}/>
<ul>
{this.getArticles()}
</ul>
```

getArticles 메쏘드는 Article의 상태를 가져오는 함수입니다.

```JavaScript
getArticles(){
  let lis = [];
  for(let i=0;i<this.state.articles.length;i++){
    lis.push(<li key={this.state.articles[i].key}>{this.state.articles[i].content}</li>);
  }
  return lis;
}
```
이렇게 작성하고 나면 목록이 다음 [그림7]과 같이 완성됩니다.

![Serverless_firebase15](./doc_img/Serverless_firebase15.jpg)

[그림7]

다음 번에는 이제 목록과 입력에 사용할 카드를 만들고 URL값을 어떻게 제대로 입력하는지 알아보도록 하겠습니다.

.
