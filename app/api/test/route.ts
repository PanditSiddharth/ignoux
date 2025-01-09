import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeInSeconds = searchParams.get("time");

  if (!timeInSeconds) {
    return NextResponse.json(
      { error: "Missing 'time' query parameter." },
      { status: 400 }
    );
  }

  const time = parseInt(timeInSeconds, 10);

  if (isNaN(time) || time < 0) {
    return NextResponse.json(
      { error: "'time' must be a valid non-negative number." },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, time * 1000));

  return NextResponse.json({
    message: `Response delayed by ${time} seconds.`,
    timeTaken: `${time} seconds`,
  });
}
