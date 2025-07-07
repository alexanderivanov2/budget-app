import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="sidebar">
      Sidebar
      <nav>
        <Link to="/">Dashboard</Link>
        <br />
        <div>
          <Link to="/transactions">Transactions</Link>
          <div>
            <Link to="/transactions/income">Income</Link>
            <br />
            <Link to="/transactions/expenses">Expenses</Link>
          </div>
        </div>
        <Link to="/statistics">Statistics</Link>
      </nav>
    </div>
  )
}

export default Sidebar