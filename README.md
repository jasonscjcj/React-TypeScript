This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

##### 安裝Create-Readct-App

```
npm install create-react-app -g
```

##### 新建項目

```
create-react-app typescript-react-app --template typescript
```

分拆command說明

- create-react-app (安裝命令)

- typescript-react-app (安裝後的目錄名稱)

- -template -typescript (使用typescript為開發語言)

###### 第一次運行測試

  ```
  npm run start
  ```

###### 開始編程

  在程式目錄內

  ```
  # 開啟visual studio code
  code .
  or
  code "your program path"
  ```

##### 定義一個Counter組件(函數方法)

在scr目錄內新建components目錄及Counter.tsx 文件

```typescript
# Counter.tsx

import * as React from 'react'

//創建類型接口
export interface Iprops{
	value: number
}

//使用接口代替PropTypes進行類型校驗
const Counter = ( {value} : Iprops ) => {
	return <p>Clicked: {value} times</p>
}

export default Counter
```

在App.tsx中引用Counter組件并展示(css / logo 如不使用可以Delete)

```typescript
# App.tsx

import React from 'react';
import Counter from './components/Counter';

class App extends React.Component {
  public render(){
    return (
      <Counter value={0}/>
    );
  }
}

export default App;

```

##### 定義一個Counter組件(類的方法)

```typescript
import * as React from 'react'

//創建類型接口
export interface IProps{
    value : number
}

//使用接口代替PropTypes進行類型校驗
export default class Counter extends React.PureComponent<IProps>{
    public render(){
        return <p>Clicked : {this.props.value} times</p>
    }
}
```

#### 在項目中配合Redux進行使用

安裝redux和react-redux以及它們的類型文件做為依赖

```
npm install -S redux react-redux @types/react-redux
```

##### 定義應用的狀態State

src/types/index.tsx

```typescript
//定義State結構類型
export type StoreState = number;
```

##### 添加Action

在 src 下創建 constants 目錄，在 index.tsx 文件中添加需要響應的消息類型

src/constants/index.tsx

```
//定義增加State類型常量
export const INCREMENT = "INCREMENT";
export type INCREMENT = typeof INCREMENT;

//定義減少State類型常量
export const DECREMENT = "DECREMENT";
export type DECREMENT = typeof DECREMENT;
```

這裡的const/type模式允許我們以容易訪問和重構的方式使用TypeScript的字符串字面量類型。接下來，我們創建一些 actions 以及創建這些 actions 的函數，src/actions/index.tsx。

src/actions/index.tsx

```typescript
import { INCREMENT, DECREMENT } from "../constants";

export interface IIncrementAction{
    type:INCREMENT
}

export interface IDecrementAction{
    type:DECREMENT
}

//定義ModifyAction類型，包含IIncrementAction和IDecrementAction接口類型
export type ModifyAction = IIncrementAction | IDecrementAction;

//增加State次數的方法
export const increment = () : IIncrementAction => ({
    type:INCREMENT,
})

//減少State次數的方法
export const decrement = () : IDecrementAction =>({
    type : DECREMENT,
})
```

##### 添加Reducer

我們的reducer將放在src/reducers/index.tsx文件裡。它的功能是保證增加操作會讓 times 加1，減少操作則要將 times 減1。

src/reducers/index.tsx

```typescript
import { ModifyAction } from "../actions";
import {INCREMENT, DECREMENT} from '../constants';

//處理及返回State
export default (state =0, action:ModifyAction): number =>{
    switch(action.type){
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state -1;
        default:
            return state
    }
}
```

##### 創建容器組件

之前我們已經使用了 Counter 組件，但是這個組件是一個純組件，此時我們需要一個組件將 Counter 和 數據連接起來。我們先修改一下原先的 Counter 組件，在其中添加一些操作按鈕

src/components/Counter.tsx

```typescript
import * as React from 'react'

//創建類型接口
export interface IProps{
    value : number,
    onIncrement: () => void,
    onDecrement: () => void,
}

//使用接口代替PropTypes進行類型校驗
export default class Counter extends React.PureComponent<IProps>{
    public render(){
        return (
            <p>
                Clicked : {this.props.value} times
                <br/>
                <br/>
                <button onClick={onIncrement} style={{marginRight:20}}>+</button>
                <button onClick={onDecrement}>-</button>
            </p>
        )
    }
}
```

##### 數據交互組件

然後我們再創建一個 container 目錄，用來存放需要與數據交互的組件，新建 CounterCon.tsx 文件.

兩個關鍵點是初始的 Counter 組件和 react-redux 的 connect 函數。 connect 可以將我們的 Counter 組件轉換成一個容器，通過以下兩個函數：

- mapStateToProps將當前store裡的數據以我們的組件需要的形式傳遞到組件。
- mapDispatchToProps利用dispatch函數，創建回調props將actions送到store。

src/container/CounterCon.tsx

```typescript
import {connect} from 'react-redux';
import {Dispatch} from'redux';
import { StoreState } from '../types';
import { increment, decrement } from '../actions';
import Counter from '../components/Counter';

//將 reducer 中的狀態插入到組件的props中
const mapStateToProps = (state:StoreState): {value:number}=>({
     value: state 
})

//將對應的Action插入到組件的props中
const mapDispatchToProps = (dispatch:Dispatch)=>({
    onIncrement:()=>dispatch(increment()),
    onDecrement:()=>dispatch(decrement()),
})

//使用connect高階組件對Counter進行包裝
export default connect(mapStateToProps,mapDispatchToProps)(Counter);

```

##### 創建 store

讓我們回到src/index.tsx。要把所有的東西合到一起，我們需要創建一個帶初始狀態的store，並用我們所有的reducers來設置它。並且使用 react-redux 的 Provider 將 props 和 容器連接起來

src/index.tsx

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';


//1. 創建Store
const store = createStore(reducer);

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // document.getElementById('root')

  //2. 然後使用react-redux的Provider將props與容器連通起來
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

回到我們的 App.jsx 文件中，之前我們引用的是 components 中的 Counter 組件，但是此時我們需要使用的是與數據有交互的 CounterCon 組件。改寫如下：

src/App.jsx

```typescript
import React from 'react';
import Counter from './components/Counter';

//引入container組件CountCon
import CountCon from './container/CountCon';


class App extends React.Component {
  public render(){
    return (
      <div className="App">
        <CountCon/>
      </div>
    );
  }
}

export default App;
```

#### 總結

至此，對於使用 TypeScript 編寫 React 應用應該有了一定的了解。其實寫法也比較固定，剛接觸的話可能有些地方容易出現問題，多寫幾個組件之後，應該就沒什麼問題了。在編寫項目的過程中，create-react-app 自帶的 tslint 可能要求比較嚴嚴格，比如：

- 在標籤裡不允許使用 lambda 表達式，在 tslint.json 文件 rules 屬性中添加："jsx-no-lambda": false 即可
- 在導入模塊時，必須按照字母順序導入，在 tslint.json 文件 rules 屬性中添加："ordered-imports": false 即可

還有很多別的配置，有需要的話，可以查看文檔：[TSLint core rules](https://palantir.github.io/tslint/rules/)。

[參考文檔@暖生](https://juejin.im/post/5c81d10b5188257ee7275222)