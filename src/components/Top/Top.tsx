import React, { useContext, useState } from 'react';
import './Top.scss';
import Calendar from 'react-calendar';
import moment from 'moment';
import { DateContext } from '../../App';

interface ITop {
    setYear: (year: number|string) => void,
    setMonth: (month: number|string) => void,
}

function Top(props: ITop) {
    const { year, month, listOfThisMonth } = useContext(DateContext);
    const { setYear, setMonth } = props;
    const [calendarOn, setCalendarOn] = useState<boolean>(false);
    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0); 
  
    React.useEffect(() => {
        const newIncome = listOfThisMonth.filter(v => v.inout === 'in').map(v => v.price).reduce((a,b) => a + b, 0);
        const newExpense = listOfThisMonth.filter(v => v.inout === 'out').map(v => v.price).reduce((a,b) => a + b, 0);
        setIncome(newIncome);
        setExpense(newExpense);
    }, [listOfThisMonth, year, month]);
        
    return (
        <div className="top-container">
            <p className="month">
                {year}년 {month}월
                <button 
                    className="btn_month" 
                    onClick={() => setCalendarOn(true)}
                >
                    🔻
                </button>
            </p>
            {calendarOn &&
                <div className="calendar">
                    <div className="bg" onClick={() => setCalendarOn(false)}/>
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
            <p className="my-money">
                {(income - expense).toLocaleString()}원
            </p>
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
    );
}

export default Top;