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