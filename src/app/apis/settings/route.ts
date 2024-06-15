import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const [settings] = await db.query('SELECT * from settings');

        // Transform settings to the desired format
        // @ts-ignore
        const transformedSettings = settings.reduce((acc, setting) => {
            switch (setting.label) {
                case 'receipt_title':
                    acc.title = setting.value;
                    break;
                case 'receipt_bottom_text':
                    acc.bottomText = setting.value;
                    break;
                case 'date_visible':
                    acc.showDate = setting.value === '1';
                    break;
                case 'amount_visible':
                    acc.showAmount = setting.value === '1';
                    break;
                case 'current_ticket_number':
                    acc.currentTicketNumber = Number(setting.value);
                    break;
                default:
                    break;
            }
            return acc;
        }, {});

        return NextResponse.json(transformedSettings, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



export async function PUT(req: NextRequest) {
    try {
        const { title, bottomText, showAmount, showDate } = await req.json()
        if (!title || !bottomText){
            return NextResponse.json({"message" : "please provide title and bottom text"})

        }
        await db.execute(
            `UPDATE settings
             SET value = CASE
               WHEN label = 'receipt_title' THEN ?
               WHEN label = 'receipt_bottom_text' THEN ?
               WHEN label = 'date_visible' THEN ?
               WHEN label = 'amount_visible' THEN ?
             END
             WHERE label IN ('receipt_title', 'receipt_bottom_text', 'date_visible', 'amount_visible')`,
            [title, bottomText, showDate, showAmount]
          );

          return NextResponse.json({"message" : "successfully updated settings"},{status : 200})
    } catch ( error : any ){
        return NextResponse.json({error : error.message}, {status : 500})
    }
}