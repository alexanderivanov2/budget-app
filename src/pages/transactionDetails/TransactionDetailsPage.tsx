import { useParams } from 'react-router-dom';
import { useDataContext } from '../../context/DataContext';

const TransactionDetailsPage = () => {
    const { id } = useParams();
    const { transactions } = useDataContext();
    const transactionDetails = id ? transactions[id] : null;

    return (
        <div className="transaction-details-page">
            <h6>TRANSACTIONS DETAILS</h6>
            {transactionDetails ? (
                <div className="transaction-details">
                    <div className="transaction-details-content">
                        <p>TRANSACTION ID: {id}</p>
                        <p>
                            TRANSACTION DATE:{' '}
                            {new Date(transactionDetails.date).toLocaleDateString()}
                        </p>
                        <p>TRANSACTION TYPE: {transactionDetails.type}</p>
                        <p>TRANSACTION AMOUNT: {transactionDetails.amount}</p>
                        <p>TRANSACTION BUDGET: {transactionDetails.budget}</p>
                        <p>TRANSACTION CATEGORY: {transactionDetails.category}</p>
                        <p>
                            TRANSACTION DESCRIPTION:{' '}
                            {transactionDetails.description || 'No Description'}
                        </p>
                    </div>{' '}
                    <div className="transaction-details-controls">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            ) : (
                'TRANSACTION DOESN`T EXIST'
            )}
        </div>
    );
};

export default TransactionDetailsPage;
