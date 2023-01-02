import { Dispatch, SetStateAction } from 'react';
import { IListItem, TActiveInput } from '../App';
import Input from '../Input/Input';

interface IAdd {
    moneyList: IListItem[];
    setActiveInput: Dispatch<SetStateAction<TActiveInput>>;
    setMoneyList: Dispatch<SetStateAction<IListItem[]>>;
}

function Add(props: IAdd) {
    return (
        <Input 
            type={'add'}
            moneyList={props.moneyList}
            setActiveInput={props.setActiveInput}
            setMoneyList={props.setMoneyList}
        />
    );
}

export default Add;