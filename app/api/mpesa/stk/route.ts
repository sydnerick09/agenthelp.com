import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone, amount } = await request.json() as { phone: string; amount: number };
    const key = process.env.MPESA_CONSUMER_KEY;
    const secret = process.env.MPESA_CONSUMER_SECRET;
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callback = process.env.MPESA_CALLBACK_URL;

    if (!key || !secret || !shortcode || !passkey || !callback) {
      return NextResponse.json({ message: "Missing Daraja API environment variables." }, { status: 400 });
    }

    const auth = Buffer.from(`${key}:${secret}`).toString("base64");
    const tokenRes = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${auth}` }
    });
    const tokenJson = await tokenRes.json() as { access_token: string };
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    const stkRes = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenJson.access_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callback,
        AccountReference: "TaskingPlan",
        TransactionDesc: "Plan Payment"
      })
    });

    const stkData = await stkRes.json();
    return NextResponse.json({ message: "STK push initiated.", data: stkData });
  } catch {
    return NextResponse.json({ message: "STK request failed." }, { status: 500 });
  }
}
