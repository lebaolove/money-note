import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './App.scss';
import List from './List/List';
import Add from './Add/Add';
import Modi from './Modi/Modi';

export interface IListItem {
  id: number;
  date: string;
  content: string;
  price: number;
  inout: 'in'|'out';
}
export type TActiveInput = ''|'add'|'modi';

function App() {
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0); 
  const [activeInput, setActiveInput] = useState<TActiveInput>('');
  const [moneyList, setMoneyList] = useState<IListItem[]>([]);
  const [modiItem, setModiItem] = useState<IListItem>();
  const [calendarOn, setCalendarOn] = useState<boolean>(false);

  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth() + 1;

  const [year, setYear] = useState<number|string>(thisYear);
  const [month, setMonth] = useState<number|string>(thisMonth);

  const listOfThisMonth: IListItem[] = moneyList.filter(item => 
    item.date.split('-')[0] === String(year) && item.date.split('-')[1] === String(month)
  );

  useEffect(() => {
    const newIncome = listOfThisMonth.filter(v => v.inout === 'in').map(v => v.price).reduce((a,b) => a + b, 0);
    const newExpense = listOfThisMonth.filter(v => v.inout === 'out').map(v => v.price).reduce((a,b) => a + b, 0);
    setIncome(newIncome);
    setExpense(newExpense);
  }, [listOfThisMonth, year, month]);

  return (
    <div className="App">
      <div id="mNote">
        {/* [S] TOP AREA */}
        <div className="top-container">
          <p className="month">
            {year}년 {month}월
            <button className="btn_month" onClick={() => setCalendarOn(true)}>🔻</button>
          </p>
          {calendarOn &&
            <div className="calendar">
                <div className="bg" onClick={() => {
                  setYear(thisYear);
                  setMonth(thisMonth);
                  setCalendarOn(false);
                }}/>
                <Calendar 
                  defaultView={"year"}
                  onClickMonth={(value) => {
                    setYear(moment(value).format("yy"));
                    setMonth(moment(value).format("M"));
                    setCalendarOn(false);
                  }}
                />
            </div>
          }
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

        <List 
          moneyList={moneyList} 
          activeInput={activeInput}
          listOfThisMonth={listOfThisMonth}
          setMoneyList={setMoneyList} 
          setActiveInput={setActiveInput}
          setModiItem={setModiItem}
        />

        {activeInput === 'add' ?
          <Add 
            moneyList={moneyList}
            setMoneyList={setMoneyList} 
            setActiveInput={setActiveInput} 
          />
          :
          activeInput === 'modi' ?
          <Modi 
            moneyList={moneyList}
            modiItem={modiItem}
            setMoneyList={setMoneyList} 
            setActiveInput={setActiveInput} 
          />
          :
          <button id="btn_add" onClick={() => setActiveInput('add')}>내역 추가</button>
        }
      </div>
    </div>
  );
}

export default App;
