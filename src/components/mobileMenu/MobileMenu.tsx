import { Link } from "react-router-dom"

export const MobileMenu = () => {
  return (
    <div className="mobile-menu">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/statistics">Statistics</Link>
      </nav>
    </div>
  )
}
