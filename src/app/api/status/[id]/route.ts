import { NextRequest, NextResponse } from "next/server";
import sha256 from "crypto-js/sha256";
import axios from "axios";

// Utility function for checksum creation
function createChecksum(merchantId: FormDataEntryValue, transactionId: FormDataEntryValue): string {
  const st = `/pg/v1/status/${merchantId}/${transactionId}` + process.env.SKEY;
  const dataSha256 = sha256(st);
  return dataSha256 + "###" + 1;
}

export async function POST(req: NextRequest) {
  // const origin = req.url?.split("?")[1]?.split("=")[1];
  const origin = process.env.NODE_ENV == "development" ? "http://localhost:3000" : 
  "https://ignoux.in"
  
  try {
    const data = await req.formData();
    const merchantId = data.get("merchantId") as string;
    const transactionId = data.get("transactionId") as string;
    if (!merchantId || !transactionId) {
      return NextResponse.redirect(`${origin}/failure`, { status: 301 });
    }

    const checksum = createChecksum(merchantId, transactionId);

    // Payment status check options
    const options = {
      method: "GET",
      url: `${process.env.PAY_URL}/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };

    // Check payment status
    const response = await axios.request(options);
    if (response.data.code !== "PAYMENT_SUCCESS") {
      return NextResponse.redirect(`${origin}/failure`, { status: 301 });
    }
    const merchantTransactionId = response.data.data.merchantTransactionId
    const tid = response.data.data.transactionId
    // Forward response to shop.ignoux.in API
    const res = await axios.post(`${origin}/api/status/${tid}`, {
      merchantId,
      transactionId: tid,
      merchantTransactionId,
      status: response.data.code,
    },
      {
        headers: {
          "Content-Type": "application/json",
        }
      });
   
    return NextResponse.redirect(res.data?.newUrl, {status: 301})
  } catch (error) {
    console.error("Error processing transaction:", error);
    return NextResponse.redirect(`${origin}/failure`, { status: 301 });
  }
}
