import { auth} from "./app/auth"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const session = await auth()
    const { pathname } = req.nextUrl

    // If there's no session and the path is not '/', redirect to '/'
    if (!session && pathname !== '/') {
        const url = req.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Apply the middleware to all paths except static files and API routes (if needed)
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}


// export default  auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "/") {
//       const newUrl = new URL("/", req.nextUrl.origin)
//       const session = await auth()
//     //  return Response.redirect(newUrl)
     
//   }
// })


