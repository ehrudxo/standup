# Day6

## 사용자 스토리3

```
1. 김개발은 아침 스탠드업 시간에 같이 이야기를 나눌 수 있는 주제를 위해 스탠드업이라는 웹 앱을 찾아간다. 이렇게 함으로써 사람들과 IT에 대한 주제로 커뮤니케이션을 할 수 있다.

2. 김개발이 사이트를 방문해서 자신이 어제 유심하게 읽은 글을 올릴 수 있다. 이렇게 하면 다른 사람들이 볼 수 있다.
  * 에디터 창에 인터넷 링크를 입력하면 자동적으로 페이지 카드가 만들어 진다. 이 때 페이지 링크는 oEmbed를 써서 동작하는데 웹 표준을 준수하고 자연스러워야 한다.
  * 에디터 창은 하나만 있고 거기서 글을 작성하고 업로드 하면 글이 외부 클라우드 공간에 저장이 된다.  

3. 김개발이 작성한 글이 목록으로 보여진다. 이렇게 함으로써 다른 사람들이 목록을 확인할 수 있다.
4. 김개발은 google ID를 가지고 로그인을 할 수 있다. 이렇게 함으로써 내가 쓴 글만 따로 모아서 볼 수 있다.
```

벌써 6일차까지 왔습니다. 조금만 더 힘내면 됩니다. 이제 사용자 스토리의 대부분은 완료한 것 같은데 하나를
더 추가해 보도록 하겠습니다.

```
김개발은 google ID를 가지고 로그인을 할 수 있다. 이렇게 함으로써 내가 쓴 글만 따로 모아서 볼 수 있다.
```

"로그인을 하는데 구글 ID로 해야한다" 라는 미션이 우리에게 주어졌습니다. 일단 사용자 스토리의 뒷쪽은 무시
하고 로그인에 집중해 보도록 하겠습니다.

<img src ="../img/Serverless_auth01.jpg" width=640>
[그림1]

그림 1과 같이 로그인을 하고 나면 프로필 페이지가 바뀌는 역할을 만들어 보도록 하겠습니다.

그러기 위해서는 일단 중요한 결정이 필요합니다. 저 중간에 보이는 로그인 페이지를 어떻게 구성할 것인가.

이 "어떻게"에는 이른바 페이지 구성에 대한 논의가 필요한데, 최근에는 SPA(Single Page Application)
을 쓰게 됩니다. 모바일 환경에서는 너무나 필수라고 생각되는 부분 중에 하나입니다.

그러면 React 에서 이 SPA를 하기 위해서는 여러가지 방법이 있겠지만 이렇게 장기적으로는 페이지가 늘어날 것
을 생각하면 우리에게 필요한 것은 React-Router 가 가장 먼저 떠오르게 됩니다.

## React-Router

기존의 페이지를 설계하는 혹은 분기(routing)하는 방법은 주로 서버단에서 이루어졌습니다. Node.js 에서
많이 사용하는 Exrpess.js를 생각해 보더라도 url에 매핑되는 request와 그에 대응하는 response를
컨트롤러에서 만들어 주었다고 하면 지금 얘기하는 React-Router의 경우는 클라이언트 단에서 이런 일련의
일들이 이뤄지게 됩니다.

그것도 그럴께 URL에 따라 페이지가 바뀌는데 페이지가 바뀌는 것이 SPA 환경에서는 JavaScript 로직안에
다 들어가 있습니다.

```
$npm install react-router --save
```
작업을 통해 설치가 가능합니다.

깃헙페이지 주소는 다음과 같습니다.

https://github.com/ReactTraining/react-router

관련된 내용은 잘 숙지하시면 도움이 될텐데 저희가 만들고 있는 쪽에서는 다음과 같이 이용해 보도록 하겠습니다.

먼저 src 폴더 아래의 index.js파일을 열어보겠습니다. 사실은 여기가 진입점이지만 그동안은 App.js 파일이
컴포넌트들의 진입점인 듯 코드를 짜왔습니다. 모두 이때를 위한 복선이었다는 사실!

아래와 같은 형태로 한번 코드를 작성해 보도록 하겠습니다.
```JavaScript
import { Router, Route, IndexRoute } from 'react-router'

ReactDOM.render(
  <Provider>
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={CardList}/>
        <Route path="/login" component={Login}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
```

뭔가가 많이 달라진 느낌이 드시나요?

그동안 App.js 파일 안에 있던 CardList가 밖으로 뺴져 나와 있고 분기중의 한 옵션으로 빠져 있다는 사실
을 보게 됩니다. 이러면 이쯤에서 어떻게 articles 값을 속성으로 넘기지? state 에 대한 관리는 어떻게 하
지 하는 의구심을 가지고 바라보시는 분도 있을 듯 합니다.

관련해서 어떻게 해결할 지는 조금 더 뒤에서 살펴 보기로 하고

```
http://<your-domain-url>/
```
링크를 따라가면 CardList 컴포넌트가 호출이 되겠구나
```
http://<your-domain-url>/Login
```
링크를 따라가면 Login 컴포넌트가 호출이 되겠구나 하는 생각을 하실 수 있다고 알 수 있을 거 같습니다.

먼저 NotFound는 이 외의 URL을 외부 사용자가 임의로 치고 들어올 때를 대비해서 만들어 두었으니 다음과 같이
만들어 둡니다.

```JavaScript
export default class NotFound extends Component {
  reder(){
    return(
      <div>Not Found!</div>
    )
  }
}
```

그러고 나서 Login 페이지를 만들어 봐야죠.

## Firebase UI Auth

로그인 페이지를 어떻게 만들고 데이터를 어떻게 입력하고 인증은 어떻게 할지 생각하셨던 분이 많으셨을 거라고
생각이 듭니다.

하지만 걱정은 안하셔도 될 거 같습니다. Firebase 는 fire base web 모듈을 제공해 줍니다.
개발자를 무척이나 편하게 해 주는 거죠. src 폴더아래 Login.js 를 다음과 같이 작성만 하면 됩니다
```JavaScript
/*global firebaseui,firebase*/
import React,{Component} from 'react'
import FirebaseDao from './FirebaseDao'
import config from './config'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props){
    super(props);
    this.ui = (new FirebaseDao(config)).getUI();
  }
  componentDidMount() {
    var uiConfig = {
      'signInSuccessUrl' : window.location.origin,
      'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    };
    this.ui.start('#firebaseui-auth', uiConfig);
  }
  componentWillUnmount() {
    this.ui.reset();
  }
  render() {
    return (
      <div id="firebaseui-auth"></div>
    );
  }
};
function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    filter: ownProps.location.query.filter
  };
}
export default connect(mapStateToProps)(Login);
```
이렇게 하고 나면 될 거라고 했는데 뭔가 의구심이 드는 사람이 있을 겁니다.
모듈 인스톨도 안하고 지나갈 수 있냐! 라는 것입니다.
아마도 주의 깊게 보신 분들이 있으실 거 같은데 페이지 제일 위에

```
/*global firebaseui,firebase*/
```

이라고 적어둔 부분이 있습니다. 네, firebaseui 의 경우는 아직 npm 모듈을 지원하지 않아서 이렇게 전역
변수로 지정을 해두고 public 폴더 아래에서 바로 firebase, firebaseui를 가져오도록 바꿔줘야 합니다.

```html
<script src="https://www.gstatic.com/firebasejs/3.6.1/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.js"></script>
<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.css" />
```

그렇게 하고 나면 그림 2와 같은 로그인 화면을 볼 수 있습니다.

<img src ="../img/Serverless_auth02.jpg">

단, 그동안 사용했던 Firebase 참조는 주석처리를 찾아가서 해주시는 수고는 필요합니다.

``` JavaScript
//import firebase from 'firebase'
```
> 이 모듈을 작성하는 동안 깃헙 이슈에 npm을 만들어 달라는 개발자들의 아우성이 빗발쳤는데
> 드디어 npm이 지원됩니다. 다음 브랜치에서는 다시 import 하도록 바꿔서 보내겠습니다.
> 하지만 우리는 아쉬울게 없는게 외부 import하는 모듈은 어떻게 처리할 지를 배웠지 않습니까?

자 이제 로그인 페이지를 만들었는데 이게 다라고 생각하시는 분은 설마 없겠죠? 로그인 페이지가 만들어 지면
어디를 가장 먼저 바꿔야 될까요?

맞습니다. 개인 프로필 페이지를 바꾸는 작업을 해 보도록 하겠습니다


### Profile 페이지

아직까지 Profile 페이지를 보면 사용자 인증이 적용되어 있지 않아 겐지로
(작성중)
.
