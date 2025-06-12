import { useState } from 'react';
import './styles/Budget.css';
import data from '../test/data.json'
import trashIcon from './resources/trash.png';
import editIcon from './resources/edit.png';
import addIcon from './resources/add.png';

const COLORS = {
    expense: '#FF6B6B', // red for expenses
    income: '#4ECDC4',  // green/blue for income
};

const CURRENCY_RATES = { USD : 1, CAD : 1.25, EUR : 0.85, GBP : 0.75 };
const TIME_DIVISORS = { YEAR : 1, MONTH : 12, WEEK : 52, DAY : 365 };

const Budget = () => {
  const [expenses, setExpenses] = useState([...data.expenses]);
  const [income, setIncome] = useState([...data.income]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currency, setCurrency] = useState('USD');
  const [timeframe, setTimeframe] = useState('year');
  
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

  function editItem() {
    setModalType('edit');
    setShowModal(true);
  }

  function addItem() {
    setModalType('add');
    setShowModal(true);
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
                <td>{item.category}</td>
                <td>{item.activity}</td>
                <td>{convertAmount(item.amount).toLocaleString(undefined, { style: 'currency', currency})}</td>
                <td><button onClick={editItem}><img className="edit" src={editIcon} /></button><button onClick={() => delItem('expense', index)}><img className="delete" src={trashIcon} /></button></td>
              </tr>
              )
            })}
            {income && income.map((item, index) => {
              return (
                <tr key={index} className="income">
                  <td>{item.category}</td>
                  <td>{item.activity}</td>
                  <td>{convertAmount(item.amount).toLocaleString(undefined, { style: 'currency', currency})}</td>
                  <td><button onClick={editItem}><img className="edit" src={editIcon} /></button><button onClick={() => delItem('income', index)}><img className="delete" src={trashIcon} /></button></td>
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
        {/* Add your form fields here */}
        <button onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
  
  return (
    <div className="content">
      <h1>Budget</h1>
      <div className="table-budget">
        {tableData()}
        {showModal && <Modal />}
      </div>
    </div>
  );
}

export default Budget;