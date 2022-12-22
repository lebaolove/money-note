import React from 'react';
import './App.scss';
import List from './List/List';
import Add from './Add/Add';

function App() {
  const [income, setIncome] = React.useState<number>(300);
  const [expense, setExpense] = React.useState<number>(20); 
  const [viewAdd, setViewAdd] = React.useState<boolean>(false);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return (
    <div className="App">
      <div id="mNote">
        {/* [S] TOP AREA */}
        <div className="top-container">
          <p className="month">{year}년 {month}월</p>
          <p className="my-money">{income - expense}원</p>
          <div className="in-out">
            <dl className="income">
              <dt>수입</dt>
              <dd>{income}원</dd>
            </dl>
            <dl className="expense">
              <dt>지출</dt>
              <dd>{expense}원</dd>
            </dl>
          </div>
        </div>
        {/* [E] TOP AREA */}

        <List setIncome={setIncome} setExpense={setExpense}/>

        {viewAdd ? 
          <Add />
          : 
          <button id="btn_add" onClick={() => setViewAdd(true)}>내역 추가</button>
        }

      </div>
    </div>
  );
}

export default App;
