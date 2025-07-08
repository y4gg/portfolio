export async function GET(request: Request) {
    const admin_cookie_value = new URL(request.url).searchParams.get('value');
    const api_key = process.env.API_KEY;
    if (api_key == admin_cookie_value) {
        return new Response('OK', { status: 200 });
    } else {
        return new Response('Unauthorized', { status: 401 });
    }
}