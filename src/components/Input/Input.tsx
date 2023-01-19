import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { setTimeout } from 'timers';
import { IListItem, TActiveInput } from '../App';
import Calendar from 'react-calendar';
import moment from 'moment';
import './Calendar.scss';

interface IInput {
    type: TActiveInput;
    moneyList: IListItem[];
    modiItem?: IListItem;
    setActiveInput: Dispatch<SetStateAction<TActiveInput>>;
    setMoneyList: Dispatch<SetStateAction<IListItem[]>>;
}

function Input(props: IInput) {
    const { type, moneyList, modiItem, setActiveInput, setMoneyList } = props;
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [inputDate, setInputDate] = useState<string>('');
    const [activeInout, setActiveInout] = useState<'none'|'in'|'out'>('none');
    const [inputContent, setInputContent] = useState<string>('');
    const [inputPrice, setInputPrice] = useState<string>('');
    const [calendarOn, setCalendarOn] = useState<boolean>(false);
    // toLocaleString() 사용 시, 콤마가 들어간 상태에서 뒷자리 추가하면 NaN 발생
    // -> 콤마를 없애고 숫자로 변환한 뒤에 사용해야 함
    const priceNum = Number(inputPrice.replace(/,/g, ''));

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 150);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if(type === 'modi' && modiItem) {
            setInputDate(String(modiItem.date));
            setActiveInout(modiItem.inout);
            setInputContent(modiItem.content);
            setInputPrice(String(modiItem.price));
        }
    }, [type, modiItem])

    const action = (type:TActiveInput) => {
        if(inputDate === '') {
            alert("날짜를 입력해 주세요.");
        } else if(activeInout === 'none') {
            alert("수입/지출 구분해 주세요.");
        } else if(inputContent === '') {
            alert("내용을 입력해 주세요.");
        } else if(inputPrice === '') {
            alert("금액을 입력해 주세요.");
        } else {
            const newList: IListItem[] = [...moneyList];
            if(type === 'add') {
                let randomId: number = 0;
                // eslint-disable-next-line no-loop-func
                while(moneyList.find(item => item.id === randomId)) {
                    randomId = Math.floor(Math.random() * 100);
                }
                const newItem: IListItem = {
                    id: randomId,
                    date: inputDate,
                    content: inputContent,
                    price: priceNum,
                    inout: activeInout             
                };
                newList.push(newItem);                
            } else if(type === 'modi' && modiItem) {
                const willModiItem = newList.find(item => item.id === modiItem.id);
                if(willModiItem) {
                    willModiItem.date = inputDate;
                    willModiItem.content = inputContent;
                    willModiItem.price = priceNum;
                    willModiItem.inout = activeInout;
                }
            }
            newList.sort((a, b) => Number(b.date.split('-')[2]) - Number(a.date.split('-')[2]));
            setMoneyList(newList);
            setActiveInput('');
        }
    }

    return (
        <div className={`input-container ${type} ${isMounted ? "on" : ""}`}>
            <h2 className="title">{`내역 ${type === 'add' ? '추가' : '수정'}`}</h2>
            <dl>
                <dt className="item-title">날짜</dt>
                <dd className="date-input">
                    <input 
                        type="text" 
                        placeholder="2023-01-01" 
                        value={inputDate} 
                        readOnly
                        onClick={() => setCalendarOn(true)}
                    />
                </dd>
            </dl>
            {calendarOn &&
            <div className="calendar">
                <div className="bg" onClick={() => setCalendarOn(false)}/>
                <Calendar 
                    formatDay={(_, date) => moment(date).format("DD")}
                    onClickDay={(value) => {
                        setInputDate(moment(value).format("YYYY-M-DD"));
                        setCalendarOn(false);
                    }}
                />
            </div>
            }
            <dl>
                <dt className="item-title">내용</dt>
                <dd className="inout-btns">
                    <button 
                        className={`income ${activeInout === 'in' ? 'active' : ''}`} 
                        onClick={() => setActiveInout('in')}>수입</button>
                    <button 
                        className={`expense ${activeInout === 'out' ? 'active' : ''}`} 
                        onClick={() => setActiveInout('out')}>지출</button>
                </dd>
                <dd>
                    <input 
                        type="text" 
                        placeholder="내용을 입력해 주세요." 
                        onChange={(e) => setInputContent(e.target.value)}
                        value={inputContent}
                    />
                </dd>
            </dl>
            <dl>
                <dt className="item-title">금액</dt>
                <dd>
                    <input 
                        type="text"
                        placeholder="금액을 입력해 주세요." 
                        value={inputPrice === '' ? '' : priceNum.toLocaleString()}
                        onChange={(e) => setInputPrice(e.target.value)}
                    />
                </dd>
            </dl>
            <div className="btm-btns">
                <button className="action" onClick={() => action(type)}>{type === 'add' ? '등록' : '수정'}</button>
                <button className="cancel" onClick={() => {setActiveInput('')}}>취소</button>
            </div>
        </div>
    );
}

export default Input;