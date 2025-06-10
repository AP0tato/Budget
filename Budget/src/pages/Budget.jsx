import React, { useState } from 'react';
import './styles/Budget.css';
import data from '../test/data.json'
import trashIcon from './resources/trash.png';
import editIcon from './resources/edit.png';
import addIcon from './resources/add.png';

const COLORS = {
    expense: '#FF6B6B', // red for expenses
    income: '#4ECDC4',  // green/blue for income
};

const Budget = () => {
  const [expenses, setExpenses] = useState([...data.expenses]);
  const [income, setIncome] = useState([...data.income]);

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

  }

  function addItem() {

  }

  const tableData = () => {
    return (
      <div className="table-budget">
        <table>
          <thead>
            <tr key="header">
              <th>Category</th>
              <th>Activity</th>
              <th>Amount / <select className="timeframe">
                <option value="year">Year</option>
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select><br />(<select className="currency">
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
                <td>{item.amount}</td>
                <td><button><img className="edit" src={editIcon} /></button><button onClick={() => delItem('expense', index)}><img className="delete" src={trashIcon} /></button></td>
              </tr>
              )
            })}
            {income && income.map((item, index) => {
              return (
                <tr key={index} className="income">
                  <td>{item.category}</td>
                  <td>{item.activity}</td>
                  <td>{item.amount}</td>
                  <td><button><img className="edit" src={editIcon} /></button><button onClick={() => delItem('income', index)}><img className="delete" src={trashIcon} /></button></td>
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
  
  return (
    <div className="content">
      <h1>Budget</h1>
      <div className="table-budget">
        {tableData()}
      </div>
    </div>
  );
}

export default Budget;