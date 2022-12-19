import React from 'react';
import './App.scss';

function App() {
  const [income, setIncome] = React.useState(300);
  const [expense, setExpense] = React.useState(20); 

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return (
    <div className="App">
      <div id="mNote">
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
      </div>
    </div>
  );
}

export default App;
