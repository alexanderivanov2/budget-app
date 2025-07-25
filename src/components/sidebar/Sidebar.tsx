import { Link } from "react-router-dom"
import { useThemeContext } from "../../context/ThemeContext"
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, handleThemeChange } = useThemeContext();

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-close'}`}>
      <button onClick={handleThemeChange}> Theme {theme}</button>
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
      <button onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>{ isOpen ? '<<' : '>>'}</button>
    </div>
  )
}

export default Sidebar