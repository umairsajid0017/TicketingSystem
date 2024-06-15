import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest ,  { params: { id } }: { params: { id: string } }) {
    const categoryId = id as string;
    try {
        const [category] = await db.query('SELECT * FROM categories WHERE id = ?', [categoryId]);
        if (!category) {
            return NextResponse.json({error: 'Category not found'}, { status: 404 });
        }
        return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    
    const categoryId = id as string;
    try {
      const { name, price, is_active } = await req.json();
      console.log( "name : " , name , "and price is : " , price , "and active is: " , is_active)  
      if (!name || !price) {
        return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
      }
      await db.query('UPDATE categories SET name = ?, price = ?, is_active = ? WHERE id = ?', [name, price, is_active, categoryId]);
      return NextResponse.json({ success: 'Category updated successfully' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  

export async function DELETE(req: NextRequest , { params: { id } }: { params: { id: string } }) {
    const categoryId = id as string;
    try {
        await db.query('DELETE FROM categories WHERE id = ?', [categoryId]);
        return NextResponse.json({success : 'Category deleted successfully'}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
