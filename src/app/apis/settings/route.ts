import db from "@/lib/db";
import { NextResponse } from "next/server";

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
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
