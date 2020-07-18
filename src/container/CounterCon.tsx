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
