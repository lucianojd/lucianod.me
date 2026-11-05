import { NextResponse } from 'next/server';

export function HTTPBadRequest(body: object): NextResponse {
  return NextResponse.json(body, {
    headers: { 'Content-Type': 'application/json' },
    status: 400,
  });
}

export function HTTPNotFound(body: object): NextResponse {
  return NextResponse.json(body, {
    headers: { 'Content-Type': 'application/json' },
    status: 404,
  });
}

export function HTTPInternalServerError(body: object): NextResponse {
  return NextResponse.json(body, {
    headers: { 'Content-Type': 'application/json' },
    status: 500,
  });
}

export function HTTPSuccess(body: object): NextResponse {
  return NextResponse.json(body, {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
