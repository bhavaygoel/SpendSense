import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BudgetCard } from "../Component/BudgetCard";
import { jwtDecode } from "jwt-decode";


type Transaction = {
  _id: string;
  userId: string;
  date: Date;
  amount: number;
  description?: string;
  category?: string;
}
type TransactionArray = Transaction[];
function Home() {
  const [transactions, setTransactions] = useState<TransactionArray>();
  const [budget, setBudget] = useState()
  const [dailySpend, setDailySpend] = useState()
  const [mothlySpend, setMothlySpend] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    else{
        const decodedToken = jwtDecode(token)
        const { userId } = decodedToken;
        fetchTransaction(userId)
    }
  }, [navigate])
  const fetchTransaction = async (user) =>{
    try{
      const transact = await fetch("http://localhost:5000/gettransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user })
      });
      console.log("data Recieved: ", transact);
      
      const transactData = await transact.json()
      console.log("dataArr: ", transactData);
      transactData.transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setBudget(transactData.budget);
      setDailySpend(transactData.todaySum);
      setMothlySpend(transactData.monthSum);
      setTransactions(transactData.transactions);
    } catch (e){
      console.error(e);
    }
  }

  const handleClick = () => {
    navigate("/addTransaction");
  };
  const formatDate = (dateString: Date) => {
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(dateString)
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }
return (
  <div className="px-10 py-10">
    <div className="flex justify-between mb-10">
      <h1 className="font-bold text-xl">Your Spend Tracker!</h1>
      <Button onClick={() => handleLogout()}>Log Out</Button>
    </div>
    <div className="flex justify-between">
      <BudgetCard heading="Your Budget is: "  budget={budget} parent={true} setBudget={setBudget}/>
      {budget !== 0 && (
      <>
        <BudgetCard heading="Your Daily spend is: " budget={dailySpend} percentage={(dailySpend * 100)/ (budget/30) } />
        <BudgetCard heading="Your Monthly spend is: " budget={mothlySpend} percentage={(mothlySpend * 100)/ budget }/>
      </>
      )}
    </div>
    <div className="flex justify-end mt-4">
      <Button  onClick={() => handleClick()} color="blue">
        Add Transaction
      </Button>
    </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="pl-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {transactions && transactions.map((transaction) => (
                  <tr className="bg-white border-b  hover:bg-gray-50 " key={transaction._id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {formatDate(transaction.date)}
                      </th>
                    <td className="px-6 py-4">{transaction.amount}</td>
                    <td className="px-6 py-4">{transaction.description}</td>
                    <td className="flex pl-6 py-4">
                    <Button className="mx-1" color="gray" pill>Edit </Button>
                    <Button className="mx-1" color="failure" pill>Delete</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
    </div>

  </div>
  );
}

export default Home;
