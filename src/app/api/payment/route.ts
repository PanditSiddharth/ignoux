import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

    // Set CORS headers to allow everyone
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow only POST and OPTIONS
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
    };

    // Handle OPTIONS preflight request
    if (req.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 204,
            headers: corsHeaders,
        });
    }

        const { dataBase64, checksum, PAY_API_URL } = await req.json()

        if (!dataBase64 || !checksum || !PAY_API_URL) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        const response = await axios.post(
            PAY_API_URL as string,
            { request: dataBase64 },
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VERIFY": checksum as string,
                },
            }
        );

        const redirectUrl = response?.data?.data?.instrumentResponse?.redirectInfo?.url;
        if (!redirectUrl) {
            throw new Error("Redirect URL is missing in the API response.");
        }

        return NextResponse.json(
            { url: redirectUrl },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during payment initiation:", error);
        return NextResponse.json(
            { error: "Failed to process payment." },
            { status: 500 }
        );
    }
}
