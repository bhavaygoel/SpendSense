import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { jwtDecode } from "jwt-decode";

type BudgetProps = {
  heading: string;
  budget: number;
  percentage?: number;
  parent?: boolean;
  setBudget?: (newBudget: number) => void;
};

export function BudgetCard({ heading, budget, percentage, parent, setBudget }: BudgetProps) {
  const [isEditable, setIsEditable] = useState(false); // State to track if input is editable

  const handleEditButtonClick = () => {
    console.log(budget);
    
    if(isEditable)
      updateBudget(Number(budget))
    setIsEditable(!isEditable);
  };

  const handleBudgetChange = async(e) => {
    const newBudget = e.target.value
    console.log(newBudget);
    
    if (setBudget) {
      setBudget(newBudget);
    }

  };
  const updateBudget = async (newBudget) => {
    console.log("Cam in updateBudget ", newBudget);
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const { userId } = decodedToken;
    try {
      const response = await fetch("http://localhost:5000/editBudget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newBudget, userId }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update budget");
      }
    } catch (error) {
      console.error("Error updating budget:", error);
      // Handle error scenario, display error message to the user, etc.
    }
  };
  
  return (
    <Card className="w-96">
      <h5 className="text-xl font-bold text-gray-900 ">
        {heading}
      </h5>
      <div className="flex justify-between items-center">
        {isEditable ? (
          <input
            type="number"
            className="text-lg font-bold mr-1"
            onChange={handleBudgetChange}
            autoFocus
          />
        ) : (
          <div className="flex flex-col">
            {!parent && (
              <p>Amount spent: </p>
            )}
            <div className="text-3xl font-bold">Rs. {budget}</div>
            {parent && (
              <div>
                <span className="font-bold">Daily Limit:</span> Rs. {Math.ceil(budget / 30)}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col items-end">
          {!parent && (
                <p>percentage spent: </p>
          )}
          {percentage && (
            <div className=" text-4xl font-bold">{percentage}%</div>
          )}
        </div>
        {parent && (
          <Button onClick={handleEditButtonClick}>
            {isEditable ? "Save" : "Edit Budget"}
          </Button>
        )}
      </div>
    </Card>
  );
}
