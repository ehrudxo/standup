# Day3

## User Story 2

```
 김개발이 사이트를 방문해서 자신이 어제 유심하게 읽은 글을 올릴 수 있다. 이렇게 하면 다른 사람들이 볼 수 있다.
  * 에디터 창은 하나만 있고 거기서 글을 작성하고 업로드 하면 글이 외부 클라우드 공간에 저장이 된다.
```

User Story2 에 맞춰 에디터를 작성해 보았습니다. 이제는 User Story의 약간 디테일한 부분을 살펴보고
그 부분에 대한 것들이 어떻게 더 풀어져 나가는지 살펴 보도록 하겠습니다.

```
에디터 창은 하나만 있고 거기서 글을 작성하고 업로드 하면 글이 외부 클라우드 공간에 저장이 된다.
```

*왜 에디터 창은 하나만 있고* 라는 표현을 썼을까요? 대부분의 소셜미디어들은 즉각적으로 남기고 싶은 말들을 남기
고 업로드를 누르면 알아서 필요한 정보들을 이쁘게 만들어서 내어 줍니다. 그것과 유사하게 우리도 카드라는 형
태를 만들어 볼 것인데, 일단 뒷쪽에 표현된 *업로드 하면 글이 외부 클라우드 공간에 저장이 된다.* 라는 데에
조금 더 관심을 기울여 만들어 보도록 하겠습니다.

### Firebase

Firebase를 제가 처음 본 것은 Angular를 한참 공부하던 시절에 Todo App 기본 예제가 Firebase로 되
어 있었습니다. 꽤 괜찮구나 하고 생각했는데 어느새 구글이 인수, 재작년 부터는 Google I/O의 주력 상품이
되어 있더군요.

일단 사이트를 방문해 볼까요?

[Firebase 홈페이지](https://firebase.google.com/)

![Firebase 홈페이지](./doc_img/Serverless_firebase01.png)

IBM의 cloudant, mongolab 같은 일종의 DBAAS(Database Aa A Service)라고 보시면 되는데 제공되
는 혜택이나 서비스들이 워낙 막강해서 개발하면서 고민해야 하는 많은 부분들을 줄여줄 수 있습니다.

가장 큰 장점이라고 하는 부분들(자랑하고 있는 부분)은 분석과 개발 툴입니다. 확실히 대시보드는 깔끔하고 개발
할때 언제나 필요했던 요소들을 sdk 로 제공해 주는데 대표적인 예로는 클라우드 메세징, 인증, 실시간 데이타베
이스, 저장소, 호스팅, 원격구성, Test Lab, 오류 보고 입니다.

이 중에 우리가 사용할 녀석은 아무래도 인증과 실시간 데이타베이스 이 두가지 입니다. 서버리스 아키텍처를 지향
하니까요~

<iframe width="560" height="315" src="https://www.youtube.com/embed/xAsvwy1-oxE" frameborder="0" allowfullscreen></iframe>

구글 I/O의 처음부터 앱 만들기를 보시면 상당히 도움이 되실거 같구요. 하지만 이와 별개로 저도 처음부터 시작해
보도록 하겠습니다.

#### 가입

가입은 Google ID가 있으면 가능합니다. 오른쪽 상단의 로그인 버튼을 누르고 로그인을 한뒤 로그인 버튼 옆에
있는 콘솔로 이동 버튼을 누릅니다.
![Go Console](./doc_img/Serverless_firebase02.png)

그럼 Console의 대문에 들어가게 되는데

![Go Console](./doc_img/Serverless_firebase03.png)

거기서 새 프로젝트 만들기를 눌러서 새 프로젝트를 만들 수 있습니다.

#### 프로젝트 만들기

다음과 같은 팝업창이 뜬 것을 확인할 수 있을 겁니다.

![Go Console](./doc_img/Serverless_firebase04.png)

프로젝트 이름을 StandUp, 국가/지역을 대한민국으로 설정하고 프로젝트 만들기 버튼을 클릭합니다.
그러고나면 몇초 후에 다음과 같은 아름다운 대시보드 화면을 볼 수 있습니다.

![Go Console](./doc_img/Serverless_firebase05.png)

네! 이제 끝났습니다~ 개발에 필요한 부분이 나올 때에 Firebase 의 기능은 조금 더 설명하기로 하고 가장 중
요한 한가지만 하고 작업을 진행하도록 하겠습니다.

*웹 앱에 Firebase 추가* 버튼을 클릭하면 다음과 같은 창이 뜨는데 거기에 나온 config 값을 사용합니다.

![Go Console](./doc_img/Serverless_firebase06.png)

## 환경 설정
일단 이런 config 파일들을 사용할 js 파일을 한번 만들어 보도록 하겠습니다.

config.js 파일을 다음과 같이 만들어 줍니다.

```
var config = {
 apiKey: process.env.REACT_APP_FIREBASE_KEY,
 databaseURL: process.env.REACT_APP_DB_URL,
 storageBucket: process.env.REACT_APP_STRG_BKT,
 messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
 embedlyKey : process.env.REACT_APP_EMBEDLY_KEY
}
export default config;
```
여기서 두가지를 설명하고 가야할 것 같습니다. 첫번째는 process.env.으로 시작하는 값들입니다. create-react-app
설명을 찾아보시면 node에서 process.env에 들어가는 값을 관리하는 것을 이용해서 process.env.REACT_APP_
로 시작하게 되는 값들은 환경변수로 사용할 수 있습니다.

그렇다면 당연히 여러분이 같이 만드신 프로젝트 루트 디렉토리에 .env 파일을 만들고
```properties
apiKey = "AIzaSyCt6rkIrXNKr9xV0l-7Ei_2m3vY6RlxdJ0"
authDomain =  "standup-4125e.firebaseapp.com"
databaseURL= "https://standup-4125e.firebaseio.com"
storageBucket= "standup-4125e.appspot.com"
messagingSenderId= "605830974241"
```
와 같이 값을 만드시면 사용할 수 있습니다.

물론 API key 값들은 어느 정도 일정 시간이 지나면 제가 바꿀 것이기는 합니다. 값은 참조하시라고 남겨두었
습니다.

이렇게 설정하고 나면 잘 가지고 오는지를 확인해 봐야겠지요?
App.js 같은 곳에 import 와 console 로그를 출력하는 소스를 집어 넣고 확인해 보도록 하겠습니다.

```Javascript
import config from './config'
console.log(config.apiKey);
```
![Go Console](./doc_img/Serverless_firebase07.jpg)

훌륭하게 출력이 되는 군요. 주의할 점 두가지는 create-react-app 의 react-scripts 버전이 0.5.0
이상이어야 하며 .env 에 등록한 변수는 꼭 node 서버를 재기동 시켜주셔야 인식 한다는 것입니다.

## HTML 편집기 작성
이제 기본적으로 HTML 편집기 에 들어갈 몇가지 유저스토리를 추가해서 작성해 보도록 하겠습니다.
```
 김개발이 사이트를 방문해서 자신이 어제 유심하게 읽은 글을 올릴 수 있다. 이렇게 하면 다른 사람들이 볼 수 있다.
  * 에디터 창은 하나만 있고 거기서 글을 작성하고 업로드 하면 글이 외부 클라우드 공간에 저장이 된다.
  * 아무런 내용도 김개발이 입력하지 않으면 업로드하지 않는다.( 버튼이 눌러지지 않는다. )
```

유저 스토리에서 *에디터 창은 하나만* 있지만 개발을 하면서 데이타를 저렇게 저장할 수는 없을테니 어떻게 구
조화 할지 고민을 일단 한번 해 보도록 합시다. 소셜미디어데 들어가는 데이타를 다시한번 생각해 보면 아래와
같은 형태로 구조화 되어 있지 않을까 확인할 수 있습니다.

```
글 내용
작성자
URL
  - 링크 타이틀
  - 링크 요약
  - 링크 이미지
```

글 내용은 사용자가 작성한 내용을 그대로 넣으면 되고, 작성자는 일단 Anonymous(겐지)로 지정하면 되는데
URL의 아래 내용은 어떻게 할까요? 관련 내용은 다음번에 조금더 기술하도록 하고 오늘은 일단 URL만 글 내용
에서 분리하는 작업을 해 보겠습니다.

Editor.js 파일의 innerEdit 클래스에 이벤트를 한번 추가해 보도록 하겠습니다.
```html
<div className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
            onKeyUp={this.editorChange}></div>
```
onKeyUp 이벤트는 URL을 입력하고 엔터나 스페이스를 쳤을 때 패턴 매칭을 통해 URL을 뽑아내고 onPaste
이벤트는 복사 붙여넣기 할때의 이벤트를 잡아내는 역할을 합니다.
```JavaScript
onPaste(event){
  event.clipboardData.items[0].getAsString(text=>{
    if(this.detectURL(text)){
      this.setState({embedlyUrl:text,content:this.state.content}});
    }
  })
}
editorChange(event){
  let checkText = this.detectURL(event.currentTarget.textContent);
  if(!this.state.embedlyUrl&&
      (event.keyCode===32||event.keyCode===13)&&
      checkText){
    this.setState({embedlyUrl:checkText,content:event.currentTarget.textContent});
  }else{
    this.setState({content:event.currentTarget.textContent});
  }
}
```
onPaste와 editorChange는 모두 event 에서 값을 받지만 text 값을 얻어내는 방법이 조금씩 다릅니다.
onPaste는 클립보드의 아이템에서 값을 getAsString이라는 함수를 통해 얻어내는데 콜백함수의 매개 변수로
화살함수를 사용했습니다.
(여러번 ES2015 문법에 대해서 설명을 드렸지만 화살함수는 this를 의도적으로 지정할 수 있고 실제 함수를 풀
어 쓰면 다음과 같은 형태의 함수로 바꿀 수 있습니다.)
```JavaScript
onPaste(event){
  var that = this;
  event.clipboardData.items[0].getAsString(function(text){  
      if(that.detectURL(text)){
        that.setState({embedlyUrl:text});
      }
  })
}
```
그리고 onPaste와 editorChange 모두 편집기의 텍스트 값에 들어가는 URL을 받아서 state 값에 저장을
하는 역할을 하고 있습니다. 하지만 content에 들어가는 값을 얻어내는 과정은 두가지가 조금 다릅니다.
먼저 editorChange 함수는 엔터와 스페이스바를 입력했을때
```
event.keyCode===32||event.keyCode===13
```
편집기의 값을 확인하는 한편 onPaste는 event의 클립보드에서 텍스트를 잡아내는 거라 데이타를 완성하는
부분이 다릅니다.

지금까지의 Editor.js 소스는 다음과 같습니다.

```JavaScript
class Editor extends Component {
  /*사용되는 메쏘드들을 모두 this 로 사용할 수 있도록 바인딩 해 준다.*/
  constructor(props){
    super(props);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.getCard = this.getCard.bind(this);
    this.hasValue = this.hasValue.bind(this);
    //embedlyUrl과 content로 분리해 준다. 사용자 추가 전
    this.state ={
      embedlyUrl : undefined,
      content : undefined
    }
  }
  // 복사 붙여넣기에 사용되는 이벤트를 다뤄준다.
  onPaste(event){
    //클립보드 아이템의 첫번째 배열에서 text 를 받는다.
    event.clipboardData.items[0].getAsString(text=>{
      //원래는 text가 String 형태인지 확인해 봐야하지만 getAsString이라 에러보다는 비정상 작동
      //이 이루어질 수 있다.
      // detectURL 이라는 dummy function 이 필요하다.
      if(detectURL(text)){
        //content 의 state는 이미 붙여진 상태 이후기 때문에 state를 그대로 가져와도 됨
        this.setState({embedlyUrl:text});
      }
    })
  }
  editorChange(event){
    // detectURL 이라는 dummy function 이 필요하다.
    let checkText = detectURL(event.currentTarget.textContent);
    if(!this.state.embedlyUrl&&
        (event.keyCode===32||event.keyCode===13)&&
        checkText){
      this.setState({embedlyUrl:checkText,content:event.currentTarget.textContent});
    }else{
      this.setState({content:event.currentTarget.textContent});
    }
  }
  //일단은 Dummy 함수가 필요하다.
  detectURL(text){
    return undefined;
  }
  render() {
    return (
      <div className="wrapEditor">
        <Profile isAnonymous={this.props.isAnonymous}/>
        <div className="textEditor">
          <div className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
            onKeyUp={this.editorChange}></div>
        </div>
        <div className="actionBar">
          <button className="upload"
            onClick={this.props.submit}><span>스탠드업!</span></button>
        </div>
      </div>
    );
  }
}
```
하지만 공통적으로 어떤 URL을 찾아내는 작업의 경우는 detectURL이라는 공통함수를 만들어야 되겠군요. 지금
은 dummy 함수 입니다.
아직까지는 이런 공통적인 함수나 로직 없이 진행해서 테스트코드에 대한 언급을 하지 않았지만 이번에는 언급을
하고 시작하고자 합니다.
#### 테스트 코드
create-react-app 은 기본적으로 jest를 내장하고 있습니다. 그래서 jest를 이용하는 방법과 똑같이 작성
하시면 됩니다.

  * __tests__ 폴더아래에 있는 .js 파일
  * .test.js로 끝나는 파일
  * .spec.js로 끝나는 파일

들은 기본적으로 테스트 파일로 인식하는데,
```
$npm test
```
를 실행시키면 진행해 볼 수 있습니다.
> npm test를 실행시키면 기본적으로 실행을 하고 대기 모드로 들어가고 언제나 Watch Usage를 뱉습니다.
> a 는 모든 테스트를 실행시켜주고, p는 정규식에 매치가 되는 filter로 테스트 케이스를 돌릴 수 있고
> q는 감지(watch)모드를 종료 시킵니다. 감지모드일 경우는 파일이 변하면 알아서 테스트 케이스를 변경합니다.

먼저 App.js 가 잘 로딩이 되는지에 대해 src 폴더 아래 App.test.js 라는 파일을 만들어 보겠습니다.
```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
```
실행 결과는 다음과 같이 표현 됩니다.
```bash
> standup@0.1.0 test /Users/SongGangho/dev/standup
> react-scripts test --env=jsdom
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.


Watch Usage
 › Press a to run all tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```
저의 경우는 파일을 만들고 마지막 커밋을 하고파일에 변화가 없는 경우라 이렇게 표시가 되는군요.

기본적으로 커밋이 안된 내용에 대해서만 감지하고 있다가 반영을 하는 훌륭한 메커니즘을 가지고 있습니다.

하지만 파일을 약간 수정하고 나면 그걸 바로 실행시켜 줍니다. 아래와 같이 실행이 됩니다.
```bash
PASS  src/App.test.js
 ✓ renders without crashing (22ms)

Test Summary
› Ran all tests related to changed files.
› 1 test passed (1 total in 1 test suite, run time 1.327s)

Watch Usage
› Press a to run all tests.
› Press o to only run tests related to changed files.
› Press p to filter by a filename regex pattern.
› Press q to quit watch mode.
› Press Enter to trigger a test run.
```
iTerm 같은데서는 PASS가 녹색으로 표시 되어 있습니다.

#### detectURL

이제 컴포넌트가 잘 로딩되는지에 대한 테스트는 마쳤으니 한번 detectURL에 대한 테스트 코드를 작성해 보도
록 하겠습니다.

일단 src 폴더 아래에 __tests__ 폴더를 만들고, 우리가 테스트할 Editor.js파일과 똑같은 이름의 Editor.js
파일을 아래와 같이 만듭니다.

이 때 첫번째 원칙은 에러가 나는 코드를 만드는 것이죠. 이미
```
return undefined;
```
를 통해 코드를 만들어 놓았습니다. 이제는 테스트 코드를 아래와 같이 만들어 보겠습니다.

```JavaScript
//Editor.js
import Editor from '../Editor';
let ed = new Editor;
it('detect URL ', () => {
  expect(ed.detectURL("my www.devpools.kr ")).toEqual("www.devpools.kr");
});
```
어떤 text값이 들어 오더라도 URL을 반환을 해 주는데 여러개가 있을지라도 하나의 URL을  반환을 받는
테스트 코드를 짜 보았습니다.

이렇게 실행을 시키면
```bash
PASS  src/App.test.js
FAIL  src/__tests__/Editor.js
 ● detect URL

   expect(received).toEqual(expected)

   Expected value to equal:
     "www.devpools.kr"
   Received:
     "undefined"

   Difference:

   Comparing two different types of values:
     Expected: array
     Received: undefined

     at Object.<anonymous> (src/__tests__/Editor.js:4:44)

Test Summary
› Ran all tests.
› 1 test failed, 1 test passed (2 total in 2 test suites, run time 0.125s)

Watch Usage
› Press o to only run tests related to changed files.
› Press p to filter by a filename regex pattern.
› Press q to quit watch mode.
› Press Enter to trigger a test run.
```
와 같이 나오고 PASS 는 녹색 FAIL은 빨강색으로 분리가 됩니다.

해석을 하면 [www.clien.net] 을 기대했는데, undefined가 왔다. 라고 하는 군요.

그럼 일단 패스만 시켜보기 위해 다음과 같이 detectURL을 변경해 보겠습니다.

```JavaScript
detectURL(text){
    return "www.devpools.kr";
}
```
이렇게 할 경우는 당연히
```bash
PASS  src/App.test.js
PASS  src/__tests__/Editor.js
Test Summary
› Ran all tests related to changed files.
› 2 tests passed (2 total in 2 test suites, run time 0.096s)
```
모두 통과하게 됩니다.

자, 하지만 이렇게 해서는 모든 경우를 통과할 수는 없을 겁니다. 이런 텍스트를 잘 다루기 위해 많이 사용되는
방법이 정규식인데요. 아래의 test 케이스를 모두 통과하는 정규식을 한번 짜 볼까합니다.
```JavaScript
it('detect URL 1', () => {
  expect(ed.detectURL("my www.devpools.kr ")).toEqual("www.devpools.kr");
});
it('detect URL 2', () => {
  expect(ed.detectURL("http://www.devpools.kr 는 www.github.com 의 내용이 전부 궁금하다")).toEqual("http://www.devpools.kr");
});
it('detect URL 3', () => {
  expect(ed.detectURL("www.github.com 에 관해서는 http://www.devpools.kr 이 전문가다")).toEqual("http://www.devpools.kr");
});
```
1번은 그냥 하나를 확인하는 내용이고 2번과 3번은 텍스트 내의 URL 들을 모두 확인해 봐야 합니다. 하지만
URL의 경우는 http 로 시작하는 경우가 있고, 그냥 .net .com 같은 접미어로 끝나는 여러가지 경우가 있
습니다. 이 모든 경우를 다 커버할 수 있는 내용의 정규식보다는 간단하게 http(혹은 https) 로 시작하는 패
턴과 www 로 시작하는 패턴을 파악해서 배열로 반환하도록 해보겠습니다. 둘다 존재한다면 http 까지 전체 있
는 URL을 먼저 반환하면 더 좋겠죠.
```JavaScript
detectURL(text){
  var urls = text.match(/(https?:\/\/[^\s]+)/g)||text.match(/(www.[^\s]+)/g);
  if(urls.length>0) return urls[0];
  else return undefined;
}
```
혹시 관련해서 좋은 정규식 패턴을 아시는 분이 계시면 답변 주시면 소스를 변경하겠습니다. 혹은 PU는 더 두팔
벌려 환영하겠습니다.

위와 같은 소스를 반영을 했더니 npm test는 모두 녹색 PASS를 반환합니다.

```bash
PASS  src/App.test.js
PASS  src/__tests__/Editor.js
Test Summary
› Ran all tests.
› 4 tests passed (4 total in 2 test suites, run time 0.106s)

Watch Usage
› Press o to only run tests related to changed files.
› Press p to filter by a filename regex pattern.
› Press q to quit watch mode.
› Press Enter to trigger a test run.
```

#### 폼 제출하기 전에 고려할 사항
이제 클라우드 서비스에 반영할 준비는 거의 끝나가는데요. 기본적으로 편집기에 있는 값을 던지기 전의 준비사항
만 더 살펴 볼까요. 일단 편집기에 값이 있는지 없는지에 대한 확인을 해 봐야 할 거 같습니다.

편집기의 값이 존재하고 string 값이 들어왔을 때에만 제출하는 코드를 짜야할 것이라고 판단할 때 테스트 코드
는 다음과 같이 정의를 하면
```JavaScript
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
it('hasValue 5',()=>{
  expect(ed.hasValue({})).toEqual(false);
});
it('hasValue 6',()=>{
  expect(ed.hasValue([]])).toEqual(false);
});
```

실행 코드는 다음과 같습니다.
```JavaScript
hasValue(value){
  if((value && (typeof value) === "string"))
    return (!value)?false:(value.trim()===""?false:true);
  else return false;
}
```

결과는 당연히
```bash
PASS  src/App.test.js
PASS  src/__tests__/Editor.js
Test Summary
› Ran all tests related to changed files.
› 8 tests passed (8 total in 2 test suites, run time 0.092s)
```
와 같이 나옵니다


이제 다음번에는 firebase 를 이용한 입력과 조회를 해 봐야겠습니다.

지금까지의 Editor.js 소스는 다음과 같습니다.

```JavaScript
import React, { Component } from 'react';
import './Editor.css';
import Profile from './Profile';

class Editor extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.getCard = this.getCard.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.detectURL = this.detectURL.bind(this);
    this.state ={
      embedlyUrl : undefined,
      content : undefined
    }
  }
  onPaste(event){
    event.clipboardData.items[0].getAsString(text=>{
      if(this.detectURL(text)){
        this.setState({embedlyUrl:text});
      }
    })
  }
  editorChange(event){
    let checkText = this.detectURL(event.currentTarget.textContent);
    if(!this.state.embedlyUrl&&
        (event.keyCode===32||event.keyCode===13)&&
        checkText){
      this.setState({embedlyUrl:checkText,content:event.currentTarget.textContent});
    }else{
      this.setState({content:event.currentTarget.textContent});
    }
  }
  getCard(embedlyUrl){
    if(embedlyUrl){
      return(
        <div>{embedlyUrl}</div>
      );
    }else{
      return(<div/>);
    }
  }
  hasValue(value){
    if((value && (typeof value) === "string"))
      return (!value)?false:(value.trim()===""?false:true);
    else return false;
  }
  handleSubmit(event){
    this.props.submit();
  }
  detectURL(text){
    var urls = text.match(/(https?:\/\/[^\s]+)/g)||text.match(/(www.[^\s]+)/g);
    if(urls.length>0) return urls[0];
    else return undefined;
  }
  render() {
    return (
      <div className="wrapEditor">
        <Profile isAnonymous={this.props.isAnonymous}/>
        <div className="textEditor">
          <div className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
            onKeyUp={this.editorChange}></div>
          {this.getCard(this.state.embedlyUrl)}
        </div>
        <div className="actionBar">
          <button className="upload"
            disabled={!this.hasValue(this.state.content)}
            onClick={this.handleSubmit}><span>스탠드업!</span></button>
        </div>
      </div>
    );
  }
}
export default Editor;
```

설명하지 않은 함수 중에 getCard라는 함수가 있습니다. 이 함수는 나중에 편집기에 카드가 들어가는 모습을 보
기 위해 URL이 들어갈 수 있도록 간단하게 설계해 두었습니다. Embed.ly 관련 내용이 들어갈때 가장 많은 설
명이 들어갈 컴포넌트가 될 것입니다.
