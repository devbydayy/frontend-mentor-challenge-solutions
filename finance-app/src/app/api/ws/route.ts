import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "WebSocket server would be running on a separate instance.",
    status: "For demonstration purposes only."
  });
}
