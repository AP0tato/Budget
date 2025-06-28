import { useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

import './styles/Budget.css';
import data from '../test/data.json'
import trashIcon from './resources/trash.png';
import editIcon from './resources/edit.png';
import addIcon from './resources/add.png';

const COLORS = {
  expense: '#FF6B6B', // red for expenses
  income: '#4ECDC4',  // green/blue for income
};

const CATEGORIES = ['food', 'transport', 'entertainment', 'utilities', 'rent', 'salary', 'bonus', 'travel', 'investments', 'freelance'];

const CURRENCY_RATES = { USD : 1, CAD : 1.25, EUR : 0.85, GBP : 0.75 };
const TIME_DIVISORS = { YEAR : 1, MONTH : 12, WEEK : 52, DAY : 365 };

const Budget = () => {
  const [expenses, setExpenses] = useState([...data.expenses]);
  const [income, setIncome] = useState([...data.income]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currency, setCurrency] = useState('USD');
  const [timeframe, setTimeframe] = useState('year');
  const [editItemData, setEditItemData] = useState(null);
  
  const [formCategory, setFormCategory] = useState('');
  const [formActivity, setFormActivity] = useState('');
  const [formAmount, setFormAmount] = useState('');
  
  function convertAmount(amount) {
    return (amount * CURRENCY_RATES[currency]) / TIME_DIVISORS[timeframe.toUpperCase()];
  }

  function delItem(category, index) {
    if (category === 'expense') {
      const newExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(newExpenses);
    } else if (category === 'income') {
      const newIncome = income.filter((_, i) => i !== index);
      setIncome(newIncome);
    }
      // If you want to persist, use localStorage or an API here
  }

  function editItem(category, index) {
    setModalType('edit');
    setShowModal(true);
    let item;
    if (category === 'expense') {
      item = expenses[index];
    } else if (category === 'income') {
      item = income[index];
    }
    setEditItemData({ ...item, category });
    setFormCategory(item.category);
    setFormActivity(item.activity);
    const displayAmount = (
      (item.amount * CURRENCY_RATES[currency]) /
      TIME_DIVISORS[timeframe.toUpperCase()]
    ).toFixed(2);
    setFormAmount(displayAmount);
  }

  function addItem() {
    setModalType('add');
    setShowModal(true);
    setFormCategory('');
    setFormActivity('');
    setFormAmount('');
  }

  function toTitleCase(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const tableData = () => {
    return (
      <div className="table-budget">
        <table>
          <thead>
            <tr key="header">
              <th>Category</th>
              <th>Activity</th>
              <th>Amount / <select className="timeframe" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                <option value="year">Year</option>
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select><br />(<select className="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>)</th>
              <th>Edit/Delete</th>
            </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((item, index) => {
            return (
              <tr key={index} className="expense">
                <td>{toTitleCase(item.category)}</td>
                <td>{toTitleCase(item.activity)}</td>
                <td>{convertAmount(item.amount).toLocaleString(undefined, { style: 'currency', currency})}</td>
                <td><button onClick={() => editItem('expense', index)}><img className="edit" src={editIcon} /></button><button onClick={() => delItem('expense', index)}><img className="delete" src={trashIcon} /></button></td>
              </tr>
              )
            })}
            {income && income.map((item, index) => {
              return (
                <tr key={index} className="income">
                  <td>{toTitleCase(item.category)}</td>
                  <td>{toTitleCase(item.activity)}</td>
                  <td>{convertAmount(item.amount).toLocaleString(undefined, { style: 'currency', currency})}</td>
                  <td><button onClick={() => editItem("income", index)}><img className="edit" src={editIcon} /></button><button onClick={() => delItem('income', index)}><img className="delete" src={trashIcon} /></button></td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="add-item">
                <button onClick={addItem}>Add Item <img src={addIcon} /></button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  const Modal = () => (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{modalType === 'add' ? 'Add Item' : 'Edit Item'}</h2>
        {
          <div className='item-form'>
            <div className="div-1">
              <label>Category:</label>
              <select 
                className='category' 
                value={formCategory}
                onChange={(e => setFormCategory(e.target.value))}
              >
                { CATEGORIES.map((category, index) => (
                  <option key={index} value={category}>{toTitleCase(category)}</option>
                ))}
              </select>
            </div>
            <div className="div-2">
              <label>Activity:</label>
              <input 
                type="text" 
                placeholder={modalType==='add'?"Enter activity":""} 
                value={toTitleCase(formActivity)} 
                onChange={e => setFormActivity(e.target.value)}
              />
            </div>
            <div className="div-3">
              <label>Amount/<select className="timeframe" value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <option value="year">Year</option>
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select> (<select className="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>):</label>
              <input 
                type="text" 
                placeholder="Enter amount" 
                value={formAmount} 
                onChange={e => setFormAmount(e.target.value)}
              />
            </div>
          </div>
        }
        <div className="buttons">
          <button onClick={() => setShowModal(false)}>{modalType==='add'?'Add':'Save'}</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );

  let avg = 0;
  let count = 0;
  const pieData = () => {
    let obj = [];
    if(expenses) {
      expenses.forEach(item => {
        obj.push({ name:item.category, value: item.amount, type: 'expense'})
        avg += item.amount;
        count++;
      })
    }

    if(income) {
      income.forEach(item => {
        obj.push({ name:item.category, value: item.amount, type: 'income'})
        avg += item.amount;
        count++;
      })
    }

    return obj;
  };

  const pieDataArr = pieData();
  avg /= count||1;

  let expenseSum = expenses.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);
  let incomeSum = income.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);

  const pieDataArr2 = [
    { name: 'Expenses', value: expenseSum, type: 'expense' },
    { name: 'Income', value: incomeSum, type: 'income' }
  ]

  const renderPieLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;
  
  return (
    <div className="content">
      <h1>Budget</h1>
      <div className="budget-container">
        <div className="table-budget">
          {tableData()}
          {showModal && <Modal />}
        </div>
        <div className="graphs">
          <div className="pie-chart-container">
            <PieChart width={350} height={350}>
              <Pie 
                data={pieDataArr} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%"
                outerRadius={70}
              >
                {pieDataArr.map((entry, index) => (
                  <Cell 
                    key={`cell2-${index}`} 
                    fill={COLORS[entry.type]} 
                  />
                ))}
              </Pie>
              <Pie
                data={pieDataArr2}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                innerRadius={80}
                outerRadius={100}
                label={renderPieLabel}
                labelLine={false}
              >
                {pieDataArr2.map((entry, index) => (
                  <Cell 
                    key={`cell2-${index}`} 
                    fill={COLORS[entry.type]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="bar-chart-container">
            <BarChart 
              width={600} 
              height={300} 
              data={pieDataArr}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "#fff", fontWeight: "bold" }} 
                axisLine={{ stroke: "#fff", strokeWidth: 1 }}
                tickLine={{ stroke: "#fff", strokeWidth: 2 }}
              />
              <YAxis 
                tick={{ fill: "#fff", fontWeight: "bold" }} 
                axisLine={{ stroke: "#fff", strokeWidth: 1 }}
                tickLine={{ stroke: "#fff", strokeWidth: 2 }}
              />
              <Tooltip />
              <Bar dataKey="value">
                {pieDataArr.map((entry, index) => (
                  <Cell key={`bar-cell-${index}`} fill={COLORS[entry.type]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;