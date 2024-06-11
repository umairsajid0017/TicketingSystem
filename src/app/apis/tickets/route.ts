// app/api/tickets/route.js
import db from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

// export async function GET( req : NextRequest) {
//   try {
//     const [rows] = await pool.query('SELECT * FROM tickets');
//     return new Response(JSON.stringify(rows), { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }

export async function GET() {
    try {
        const [tickets] = await db.query('SELECT tickets.id , ticket_number, tickets.quantity, tickets.created_at ,categories.name as category_name, tickets.amount FROM tickets INNER JOIN categories ON tickets.category_Id=categories.id ORDER BY id DESC;');
 
        return NextResponse.json({ tickets }, { status: 200 })
    } catch (error: any) {
     
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function POST(req: NextRequest) {
    try {
        let { category_Id, amount, quantity } = await req.json();
        const [fetchTicketNumber] = await db.query(
            "SELECT value FROM settings WHERE label='current_ticket_number';"
        )
        // @ts-ignore
        let ticketNumber = fetchTicketNumber[0].value
        amount = amount / quantity
      

        for (let i = 1 ; i <= quantity; i++) {
            ++ticketNumber
            await db.query(
                'INSERT INTO tickets (category_Id, ticket_number, amount, quantity) VALUES (?,?, ?, ?)',
                [category_Id, ticketNumber, amount, 1]
            )
            await db.query(
             ' UPDATE `settings` SET `value`= ? WHERE label="current_ticket_number"',
                [ticketNumber]
            )
        }
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}