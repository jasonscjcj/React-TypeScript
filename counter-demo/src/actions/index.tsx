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

