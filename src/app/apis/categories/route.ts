import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const [categories] = await db.query('SELECT * FROM categories ');
        return NextResponse.json({ categories }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, price } = await req.json();
        console.log("name:",name, "    price: ",price)    
        if (!name || !price) {
            return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
        }
        const [result] = await db.query('INSERT INTO categories (name, price) VALUES (?, ?)', [name, price]);
        // @ts-ignore
        return NextResponse.json({ id: result.id, name, price });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
