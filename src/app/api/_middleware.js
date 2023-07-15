import { NextResponse } from "next/server";
import { bodyParser } from "next/server";

export function middleware(req) {
  // Enable body parser middleware
  bodyParser(req);

  return NextResponse.next();
}