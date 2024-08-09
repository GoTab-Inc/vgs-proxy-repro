const fetch = require('node-fetch');
const ProxyAgent = require('https-proxy-agent');

const PROXY_URI = process.env.PROXY_URI;
const USE_PROXY = process.env.USE_PROXY !== 'false';
const REQUEST_COUNT = 8;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Sends the payload to the echo server and returns the response.
async function send(payload) {
  const response = await fetch('https://echo.secure.verygood.systems/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    agent: USE_PROXY 
      ? new ProxyAgent(PROXY_URI) 
      : undefined,
  });
  // console.log(response.header); // Uncomment to see the response headers
  return response.text();
}

async function test(fn, count) {
  if(USE_PROXY) {
    console.log(`Proxy enabled: ${PROXY_URI}`);
  } else {
    console.log('Proxy disabled');
  }
  await Promise.allSettled(Array.from({ length: count }, async (_, i) => {
    try {
      const t0 = performance.now();
      const promise = fn({ requestNumber: i })
        // .then((response) => console.log(response)); // Uncomment to see the response text
      await Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 30_000))
      ]);
      const t1 = performance.now();
      console.log(`Request ${i} took ${t1 - t0} milliseconds.`);
    } catch (err) {
      console.error(`Request ${i} failed: ${err.message}`);
    }
  }));
  // Manually exiting here ensures that lingering connections/timeouts are closed
  process.exit();
}

test(send, REQUEST_COUNT);
