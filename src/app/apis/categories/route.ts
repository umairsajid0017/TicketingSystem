import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const [categories] = await db.query('SELECT * FROM categories Order by id DESC');
        return NextResponse.json({ categories }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, price, image } = await req.json();
        if (!name || !price) {
            return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
        }
        const [result] = await db.query('INSERT INTO categories (name, price, image) VALUES (?, ?, ?)', [name, price, image]);
        // @ts-ignore
        return NextResponse.json({ id: result.id, name, price, image });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
