import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function AddTransaction() {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<Date>(new Date());
    console.log(date);
    
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        console.log("Sending Request for: ", amount, description);
        
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:5000/createtransaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount, description,date }) // Use shorthand property names
            });
            
            if (response.ok) {
                navigate("/");
            } else {
                // Handle error cases here
                console.error("Failed to create transaction:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="flex w-3/12 flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Amount" />
                    </div>
                    <TextInput value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} type="number" placeholder="1000" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="Description" value="Description" />
                    </div>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Lunch...." />
                </div>
                <input type="date" value={date.toISOString().split('T')[0]} onChange={(e) => setDate(new Date(e.target.value))} required />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default AddTransaction;
