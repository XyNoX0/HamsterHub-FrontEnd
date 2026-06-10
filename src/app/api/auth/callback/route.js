import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  try {
    const response = await fetch('https://nj.dekhub.com/hamsterhub/discord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await response.json(); // discord data

    if (response.ok && data) {
      const cookieStore = await cookies();
      cookieStore.set('discord_data', JSON.stringify(data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      // Redirect the user to the member page
      redirect('/member');
    } else {
      return new Response('Authentication failed', { status: 401 });
    }
  } catch (error) {
    // The redirect() function throws a NEXT_REDIRECT error.
    // We re-throw it so Next.js can handle it.
    if (error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    console.error('Authentication error:', error);
    return new Response('Authentication failed due to an internal error.', { status: 500 });
  }
}