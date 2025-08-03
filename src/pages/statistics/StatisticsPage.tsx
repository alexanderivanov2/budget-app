import { useDataContext } from '../../context/DataContext'

export const StatisticsPage = () => {
  const { incomeData, expenseData, transactions } = useDataContext();
  return (
    <div className='statistics'>StatisticsPage

      <div>
        <h1>INCOME DATA</h1>
        {Object.keys(incomeData).map((y) => {
          const year = Number(y);
          return (<div key={year}>
            <h3>
              YEAR: {year}
            </h3>
            
            {Object.keys(incomeData[year]).map((m) => {
              const month = Number(m);
              return (
                <div key={m}>
                  <h3>MONTH: {month}</h3>
                  {Object.keys(incomeData[year][month]).map((d) => {
                    const day = Number(d);
                    return (
                      <div key={day}>
                        <h3>DAY: {day}</h3>
                        {incomeData[year][month][day].map((item) => <p key={item.id}>{item.id} - {transactions[item.id].amount}</p>)}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>)
        })}
      </div>
      <div>
        <h1>EXPENSE DATA</h1>
        { Object.keys(expenseData).map((y) => {
          const year = Number(y)
          return (
            <div key={year}>
              <h3>{year}</h3>
              { Object.keys(expenseData[year]).map((m) => {
                const month = Number(m);
                return(
                  <div key={month}>
                    <h3>Month: {month}</h3>
                    { Object.keys(expenseData[year][month]).map((d) => {
                      const day = Number(d);
                      return(
                        <div key={day}>
                          <h3>DAY {day}</h3>
                          { expenseData[year][month][day].map((expenseItem) => {
                            return (<p key={expenseItem.id}>{expenseItem.id} - {transactions[expenseItem.id].amount}</p>)
                          })}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <div>
        <h1>TRANSFERs DATA</h1>
        {Object.keys(transactions).length && Object.keys(transactions).map((transactionKey) => {
          return <p key={transactionKey}> {transactions[transactionKey].id} - {transactions[transactionKey].amount} </p>
        })}
      </div>
    </div>
  )
}
