import { useState, useEffect } from 'react';
import { IListItem } from '../App';

interface IList {
    moneyList: IListItem[];
}

function List(props: IList) {
    type TSort = '전체'|'수입'|'지출';
    const sort: TSort[] = ['전체', '수입', '지출'];
    const [activeSort, setActiveSort] = useState<TSort>('전체');
    const [moneyList, setMoneyList] = useState<IListItem[]>(props.moneyList);
    const [clickedItem, setClickedItem] = useState<number>(-1);

    useEffect(() => {
        setMoneyList(props.moneyList);
    }, [props.moneyList]);

    useEffect(() => {
        let list: IListItem[] = [...props.moneyList];
        if(activeSort !== '전체') {
            const value = activeSort === '수입' ? 'in' : 'out';
            list = [...props.moneyList].filter(v => v.inout === value);
        }
        setMoneyList(list);
        setClickedItem(-1);
    }, [activeSort]);

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
                {moneyList.map((item) => {
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
                        />
                    );
                })}
            </ul>
        </div>
    );
}

interface IListItem2 extends IListItem {
    isClicked: boolean;
    setClickedItem: React.Dispatch<React.SetStateAction<number>>;
}
function ListItem(props: IListItem2) {
    const { id, date, content, price, inout, isClicked, setClickedItem } = props;
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
            <div className="btn-area"></div>
        </li>
    );
}

export default List;