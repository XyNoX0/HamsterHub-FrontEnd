export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
  
    const response = await fetch('https://nj.dekhub.com/hamsterhub/discord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
  
    const data = await response.json();
    console.log("data",data);
  
    if (data.user) {
      return Response.redirect(`http://localhost:3000/member?id=${data.user.id}`);
    } else {
      return new Response('Authentication failed', { status: 401 });
    }
  }
  