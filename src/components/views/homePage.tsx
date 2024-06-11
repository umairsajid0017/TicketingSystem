'use client'
import { useState, useEffect } from "react";
import { createTicket, getCategories } from "@/lib/apiRequests";
import GenerateTicket from "../shared/generateTicket";
import TicketsTable from "./ticketsTable";
import { Ticket } from "../ui/tickets/columns";

const HomePage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [quantity, setQuantity] = useState<number | undefined>();
    const [amount, setAmount] = useState<number | undefined>();
    const [response, setResponse] = useState<any>();

    const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data.categories);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory && quantity) {
            setAmount(selectedCategory.price! * quantity);
        }
    }, [selectedCategory, quantity]);

    return (
        <section>
            <div className="grid grid-cols-[25%,75%]">
                <div className="h-screen flex flex-col px-2 py-4 justify-start">
                    <GenerateTicket
                        categories={categories}
                        selectedCategory={selectedCategory!}
                        setSelectedCategory={setSelectedCategory}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        amount={amount}
                        setAmount={setAmount}
                        setResponse={setResponse}
                        response={response}
                    />
                    <div className="w-40 h-16 flex justify-center items-center text-center text-3xl my-auto bg-black text-white mx-auto mt-10 rounded-lg">
                        <p>
                            Rs {!amount ? "0" : amount}
                        </p>
                    </div>
                </div>
                <div>
                    <TicketsTable response={response} tickets={tickets} setTickets={setTickets}/>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
