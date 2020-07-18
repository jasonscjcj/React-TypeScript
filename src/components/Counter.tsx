//#region 函數方法

// import * as React from 'react';

// //創建類型接口
// export interface Iprops{
//     value: number
// }

// //使用接口代替PropTypes進行類型校驗
// const Counter = ( {value} : Iprops ) =>{
//     return <p> Clicked : {value} times</p>
// }

// export default Counter
//#endregion

//#region 類的方法
// import * as React from 'react'

// //創建類型接口
// export interface IProps{
//     value : number,
// }

// //使用接口代替PropTypes進行類型校驗
// export default class Counter extends React.PureComponent<IProps>{
//     public render(){
//         return <p>Clicked : {this.props.value} times</p>
//     }
// }
//#endregion

//#region 創建容器組件
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
        const {value, onIncrement, onDecrement} = this.props;
        return (
            <p>
                Clicked : {this.props.value} times
                <br/>
                <br/>
                <button onClick={ onIncrement } style={{marginRight:20}}>+</button>
                <button onClick={ onDecrement }>-</button>
            </p>
        )
    }
}
//#endregion