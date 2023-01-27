import { useState, createContext } from 'react';
import './styles/reset.scss';
import './styles/App.scss';
import Top from './components/Top/Top';
import List from './components/List/List';
import Input from './components/Input/Input';

export interface IListItem {
  id: number;
  date: string;
  content: string;
  price: number;
  inout: 'in'|'out';
}
export type TActiveInput = ''|'add'|'modi';

export const MoneyListContext = createContext<{
  moneyList: IListItem[],
  setMoneyList: (moneyList: IListItem[]) => void
}>({
  moneyList: [],
  setMoneyList: () => {}
});
export const ActiveInputContext = createContext<{
  activeInput: TActiveInput,
  setActiveInput: (activeInput: TActiveInput) => void
}>({
  activeInput: "",
  setActiveInput: () => {}
});
export const DateContext = createContext<{
  year: number|string,
  month: number|string,
  listOfThisMonth: IListItem[]
}>({
  year: 2023,
  month: 1,
  listOfThisMonth: []
});

function App() {
  const [moneyList, setMoneyList] = useState<IListItem[]>([]);
  const [activeInput, setActiveInput] = useState<TActiveInput>('');
  const [modiItem, setModiItem] = useState<IListItem>();

  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth() + 1;

  const [year, setYear] = useState<number|string>(thisYear);
  const [month, setMonth] = useState<number|string>(thisMonth);  

  const listOfThisMonth: IListItem[] = moneyList.filter(item => 
    item.date.split('-')[0] === String(year) && item.date.split('-')[1] === String(month)
  );

  return (
    <div className="App">
      <div id="mNote">
          <DateContext.Provider value={{ year, month, listOfThisMonth }}>
            <ActiveInputContext.Provider value={{ activeInput, setActiveInput }}>
              <MoneyListContext.Provider value={{ moneyList, setMoneyList }}>
                <Top 
                  setYear={setYear}
                  setMonth={setMonth}
                />
                <List setModiItem={setModiItem}/>
                {
                  activeInput === "add" ? <Input /> 
                  :
                  activeInput === "modi" ? <Input modiItem={modiItem} /> 
                  :
                  <button id="btn_add" onClick={() => setActiveInput("add")}>내역 추가</button>
                }
              </MoneyListContext.Provider>
            </ActiveInputContext.Provider>
          </DateContext.Provider>
      </div>
    </div>
  );
}

export default App;
