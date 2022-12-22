import React, { useEffect } from 'react';
import { setTimeout } from 'timers';

interface IAdd {
    setViewAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

function Add(props: IAdd) {
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        }, 150);
        return () => setIsMounted(false);
    }, []);

    return (
        <div id="add" className={isMounted ? "on" : ""}>
            <h2 className="title">내역 추가</h2>
            <dl>
                <dt className="item-title">날짜</dt>
                <dd className="date-input">
                    <input type="text" placeholder="2022" />
                    <input type="text" placeholder="01" />
                    <input type="text" placeholder="01" />
                </dd>
            </dl>
            <dl>
                <dt className="item-title">내용</dt>
                <dd className="inout-btns">
                    <button className="income">수입</button>
                    <button className="expense">지출</button>
                </dd>
                <dd>
                    <input type="text" className="input-long" placeholder="내용을 입력해 주세요." />
                </dd>
            </dl>
            <dl>
                <dt className="item-title">금액</dt>
                <dd>
                    <input type="text" className="input-long" placeholder="금액을 입력해 주세요." />
                </dd>
            </dl>
            <div className="btm-btns">
                <button className="add">등록</button>
                <button className="cancel" onClick={() => props.setViewAdd(false)}>취소</button>
            </div>
        </div>
    );
}

export default Add;