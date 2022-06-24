// import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    // console.log("_middleware");
    // const token = await getToken({ req: req, secret: process.env.JWT_SECRET });
    // console.log(token);
    // const { pathname, origin } = req.nextUrl;
    // console.log(origin); // http://localhost:3000
    // console.log(pathname); // /admin
    // return NextResponse.redirect("https://google.com");
    // return NextResponse.redirect(
    //     new URL(`/admin`, req.url)
    // );
    return NextResponse.next();
}