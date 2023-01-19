import { Dispatch, SetStateAction } from 'react';
import { IListItem, TActiveInput } from '../App';
import Input from '../Input/Input';

interface IModi {
    moneyList: IListItem[];
    activeInput: TActiveInput;
    modiItem?: IListItem;
    setActiveInput: Dispatch<SetStateAction<TActiveInput>>;
    setMoneyList: Dispatch<SetStateAction<IListItem[]>>;
}

function Modi(props: IModi) {
    return (
        <Input 
            type={props.activeInput}
            moneyList={props.moneyList}
            modiItem={props.modiItem}
            setActiveInput={props.setActiveInput}
            setMoneyList={props.setMoneyList}
        />
    );
}

export default Modi;