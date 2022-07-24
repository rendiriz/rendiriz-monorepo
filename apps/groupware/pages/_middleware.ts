// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { unstable_getServerSession } from 'next-auth/next';
// import { authOptions } from './api/auth/[...nextauth]';

// export async function middleware(request: NextRequest, response: NextResponse) {
//   const session = await unstable_getServerSession(
//     request,
//     response,
//     authOptions,
//   );

//   console.log('session', session);
//   console.log('request.url', request.url);

//   if (!session) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

export const config = { matcher: ['/dashboard'] };

export { default } from 'next-auth/middleware';
