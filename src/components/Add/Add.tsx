import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { setTimeout } from 'timers';
import { IListItem } from '../App';

interface IAdd {
    moneyList: IListItem[];
    setViewAdd: Dispatch<SetStateAction<boolean>>;
    setMoneyList: Dispatch<SetStateAction<IListItem[]>>;
}

function Add(props: IAdd) {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [activeInout, setActiveInout] = useState<'none'|'in'|'out'>('none');
    const [inputYear, setInputYear] = useState<string>('');
    const [inputMonth, setInputMonth] = useState<string>('');
    const [inputDay, setInputDay] = useState<string>('');
    const [inputContent, setInputContent] = useState<string>('');
    const [inputPrice, setInputPrice] = useState<string>('');

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 150);
        return () => setIsMounted(false);
    }, []);

    const add = () => {
        if(inputYear === '' || inputMonth === '' || inputDay === '') {
            alert("날짜를 입력해 주세요.");
        } else if(activeInout === 'none') {
            alert("수입/지출 구분해 주세요.");
        } else if(inputContent === '') {
            alert("내용을 입력해 주세요.");
        } else if(inputPrice === '') {
            alert("금액을 입력해 주세요.");
        } else {
            let randomId: number = 0;
            while([...props.moneyList].find(v => v.id === randomId)) {
                randomId = Math.random() * 100;
            }
            const newItem: IListItem = {
                id: randomId,
                date: Number(inputDay),
                content: inputContent,
                price: Number(inputPrice),
                inout: activeInout             
            };
            const newList: IListItem[] = [...props.moneyList];
            newList.push(newItem);
            props.setMoneyList(newList);
            props.setViewAdd(false);
        }
    };

    return (
        <div id="add" className={isMounted ? "on" : ""}>
            <h2 className="title">내역 추가</h2>
            <dl>
                <dt className="item-title">날짜</dt>
                <dd className="date-input">
                    <input type="number" placeholder="2022" onChange={(e) => setInputYear(e.target.value)}/>
                    <input type="number" placeholder="01" onChange={(e) => setInputMonth(e.target.value)}/>
                    <input type="number" placeholder="01" onChange={(e) => setInputDay(e.target.value)}/>
                </dd>
            </dl>
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
                        className="input-long" 
                        placeholder="내용을 입력해 주세요." 
                        onChange={(e) => setInputContent(e.target.value)}/>
                </dd>
            </dl>
            <dl>
                <dt className="item-title">금액</dt>
                <dd>
                    <input 
                        type="text"
                        className="input-long" 
                        placeholder="금액을 입력해 주세요." 
                        value={Number(inputPrice).toLocaleString()}
                        onChange={(e) => setInputPrice(e.target.value)}/>
                </dd>
            </dl>
            <div className="btm-btns">
                <button className="add" onClick={add}>등록</button>
                <button className="cancel" onClick={() => props.setViewAdd(false)}>취소</button>
            </div>
        </div>
    );
}

export default Add;