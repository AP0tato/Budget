import './styles/Dashboard.css';
import data from '../test/data.json' assert { type: 'json'};
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = {
  expense: '#FF6B6B', // red for expenses
  income: '#4ECDC4',  // green/blue for income
};

const expenses = data.expenses;
const income = data.income;

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
              </select><br/>(<select className="currency">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
                </select>)</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((item, index) => {
            return (
              <tr key={index} className="expense">
                <td>{item.category}</td>
                <td>{item.activity}</td>
                <td>{item.amount}</td>
              </tr>
            )
          })}
          {income && income.map((item, index) => {
            return (
              <tr key={index} className="income">
                <td>{item.category}</td>
                <td>{item.activity}</td>
                <td>{item.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
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

  const pieLabel = ({ name, value }) => {
    return value/avg >= 0.3 ? name : '';
  };

  return (
    <div className="content">
      <div className="header">
        <h1>Dashboard</h1>
      </div>
      <div className="graph">
        {tableData()}
        <div className="pie-chart-container">
          <PieChart width={600} height={450}>
            <Pie 
              data={pieDataArr} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%"
              outerRadius={140} 
              label={pieLabel}
              labelLine={false}
            >
              {pieDataArr.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.type]} 
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;