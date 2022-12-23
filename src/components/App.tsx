import { useState, useEffect } from 'react';
import './App.scss';
import List from './List/List';
import Add from './Add/Add';

export interface IListItem {
  id: number;
  date: number;
  content: string;
  price: number;
  inout: 'in'|'out';
}

function App() {
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0); 
  const [viewAdd, setViewAdd] = useState<boolean>(false);
  const [moneyList, setMoneyList] = useState<IListItem[]>([]);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  useEffect(() => {
    if(moneyList.length !== 0) {
      const newIncome = [...moneyList].filter(v => v.inout === 'in').map(v => v.price).reduce((a,b) => a + b, 0);
      const newExpense = [...moneyList].filter(v => v.inout === 'out').map(v => v.price).reduce((a,b) => a + b, 0);
      setIncome(newIncome);
      setExpense(newExpense);
    }
  }, [moneyList]);

  return (
    <div className="App">
      <div id="mNote">
        {/* [S] TOP AREA */}
        <div className="top-container">
          <p className="month">{year}년 {month}월</p>
          <p className="my-money">{(income - expense).toLocaleString()}원</p>
          <div className="in-out">
            <dl className="income">
              <dt>수입</dt>
              <dd>{income.toLocaleString()}원</dd>
            </dl>
            <dl className="expense">
              <dt>지출</dt>
              <dd>{expense.toLocaleString()}원</dd>
            </dl>
          </div>
        </div>
        {/* [E] TOP AREA */}

        <List moneyList={moneyList}/>

        {viewAdd ? 
          <Add setViewAdd={setViewAdd} setMoneyList={setMoneyList} moneyList={moneyList}/>
          : 
          <button id="btn_add" onClick={() => setViewAdd(true)}>내역 추가</button>
        }
      </div>
    </div>
  );
}

export default App;
