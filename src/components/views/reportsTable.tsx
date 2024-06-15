'use client'
import { getAllTickets } from "@/lib/apiRequests"
import { Ticket, columns } from "../ui/reports/columns"
import { DataTable } from "../ui/reports/data-table"
import { useEffect, useState } from "react"
import MyDateInput from "../shared/inputs/myDateInput"

interface Props {
  response?: any
  tickets : Ticket[]
  setTickets: any
  categories : Category[]
}

export default function ReportsTable({ response , tickets , setTickets , categories }: Props) {
  
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchData = async () => {
    const data = await getAllTickets();
    setTickets(data.tickets);
    setFilteredTickets(data.tickets);
  };

  useEffect(() => {
    fetchData();
  }, [response]);

  useEffect(() => {
    filterTickets();
  }, [startDate, endDate, tickets]);

  const filterTickets = () => {
    if (!startDate && !endDate) {
      setFilteredTickets(tickets);
      return;
    }

    const filtered = tickets.filter((ticket: Ticket) => {
      const ticketDate = new Date(ticket.created_at);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return ticketDate >= start && ticketDate <= end;
      } else if (start) {
        return ticketDate >= start;
      } else if (end) {
        return ticketDate <= end;
      }
      return true;
    });

    setFilteredTickets(filtered);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-center gap-x-2">
        <MyDateInput
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <MyDateInput
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <DataTable columns={columns} data={filteredTickets} categories={categories}/>
    </div>
  );
}
