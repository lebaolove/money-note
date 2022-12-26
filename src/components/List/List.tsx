import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { IListItem, TActiveInput } from '../App';

interface IList {
    moneyList: IListItem[];
    activeInput: ''|'add'|'modi';
    setMoneyList: Dispatch<SetStateAction<IListItem[]>>;
    setActiveInput: Dispatch<SetStateAction<TActiveInput>>;
    setModiItem: Dispatch<SetStateAction<IListItem|undefined>>;
}

function List(props: IList) {
    const { moneyList, activeInput, setMoneyList, setActiveInput, setModiItem } = props;
    type TSort = '전체'|'수입'|'지출';
    const sort: TSort[] = ['전체', '수입', '지출'];
    const [activeSort, setActiveSort] = useState<TSort>('전체');
    const [viewList, setViewList] = useState<IListItem[]>(moneyList);
    const [clickedItem, setClickedItem] = useState<number>(-1);

    useEffect(() => {
        setViewList(moneyList);
    }, [moneyList]);

    useEffect(() => {
        setClickedItem(-1);
    }, [activeInput]);

    useEffect(() => {
        let list: IListItem[] = [...moneyList];
        if(activeSort !== '전체') {
            const value = activeSort === '수입' ? 'in' : 'out';
            list = [...moneyList].filter(v => v.inout === value);
        }
        setViewList(list);
        setClickedItem(-1);
    }, [activeSort, moneyList]);

    const deleteItem = (id: number) => {
        const deletedList = moneyList.filter(item => item.id !== id);
        setMoneyList(deletedList);
    }

    const modiItem = (id: number) => {
        const willModiItem = moneyList.find(item => item.id === id);
        setModiItem(willModiItem);
        setActiveInput('modi');
    }

    return (
        <div id="list">
            <div className="sort">
                {sort.map((item, i) => {
                    return (
                        <button 
                            key={i}
                            className={activeSort === item ? 'active' : ''} 
                            onClick={() => setActiveSort(item)}
                        >{item}</button>
                    );
                })}
            </div>
            <ul className="list">
                {viewList.map((item) => {
                    return (
                        <ListItem 
                            key={item.id}
                            id={item.id}
                            date={item.date}
                            content={item.content}
                            price={item.price}
                            inout={item.inout}
                            isClicked={clickedItem === item.id}
                            setClickedItem={setClickedItem}
                            modiItem={modiItem}
                            deleteItem={deleteItem}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

interface IListItem2 extends IListItem {
    isClicked: boolean;
    setClickedItem: Dispatch<SetStateAction<number>>;
    modiItem: (id:number) => void;
    deleteItem: (id:number) => void;
}
function ListItem(props: IListItem2) {
    const { id, date, content, price, inout, isClicked, setClickedItem, modiItem, deleteItem } = props;
    return (
        <li 
            className={`${inout} ${isClicked ? 'clicked' : ''}`} 
            onClick={() => {
                if(isClicked) setClickedItem(-1);
                else setClickedItem(id);
            }}
        >
            <div className="item-info">
                <h4 className="date">{date}</h4>
                <p className="content">{content}</p>
                <p className={`price ${inout}`}>{inout === 'in' ? '+' : '-'}{price.toLocaleString()}원</p>
            </div>
            <div className="btn-area">
                <button onClick={() => modiItem(id)}>수정</button>
                <button onClick={() => deleteItem(id)}>삭제</button>
            </div>
        </li>
    );
}

export default List;