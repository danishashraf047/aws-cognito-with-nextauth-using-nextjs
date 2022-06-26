import { NextRequest, NextResponse } from 'next/server';

// it will intercept everytime before serving the page by server
export async function middleware(req: NextRequest) {
    return NextResponse.next();
}