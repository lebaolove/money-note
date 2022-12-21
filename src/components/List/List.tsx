import React from 'react';

interface IListItem {
    date: number;
    content: string;
    price: number;
    inout: 'in'|'out';
}

interface IList {
    setIncome: React.Dispatch<React.SetStateAction<number>>;
    setExpense: React.Dispatch<React.SetStateAction<number>>;
}

function List(props: IList) {
    type TSort = '전체'|'수입'|'지출';
    const [activeSort, setActiveSort] = React.useState<TSort>('전체');
    
    const testList: IListItem[] = [
        {
            date: 21,
            content: '이마트 장보기',
            price: 30000,
            inout: 'out'
        },
        {
            date: 21,
            content: '부업',
            price: 1000,
            inout: 'in'
        },
        {
            date: 20,
            content: '부업',
            price: 500,
            inout: 'in'
        },
    ];
    const [moneyList, setMoneyList] = React.useState<Array<IListItem>>(testList);

    const sort: TSort[] = ['전체', '수입', '지출'];

    React.useEffect(() => {
        let list: IListItem[] = [...testList];

        if(activeSort !== '전체') {
            const value = activeSort === '수입' ? 'in' : 'out';
            list = [...testList].filter(v => v.inout === value);
        }
        setMoneyList(list);
    }, [activeSort]);

    React.useEffect(() => {
        const income = [...testList].filter(v => v.inout === 'in').map(v => v.price).reduce((a,b) => a + b);
        const expense = [...testList].filter(v => v.inout === 'out').map(v => v.price).reduce((a,b) => a + b);
        props.setIncome(income);
        props.setExpense(expense);
    }, []);

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
                {moneyList.map((item, i) => {
                    return (
                        <ListItem 
                            key={i}
                            date={item.date}
                            content={item.content}
                            price={item.price}
                            inout={item.inout}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

function ListItem(props: IListItem) {
    const { date, content, price, inout } = props;
    return (
        <li>
            <h4 className="date">{date}</h4>
            <p className="content">{content}</p>
            <p className={`price ${inout}`}>{inout === 'in' ? '+' : '-'}{price}원</p>
        </li>
    );
}

export default List;