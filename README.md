# Proxy Wrapper

Proxy Wrapper is a Node.js module developed by aulolua that provides a convenient way to interact with the Cloudflare Warp proxy server. It allows you to manage the proxy settings, check the IP address, and perform other related operations. It basically allows you to get the best proxies with the lowest latencies.

## Installation

To use Proxy Wrapper in your Node.js project, you need to install it using npm:

```bash
npm install proxy-wrapper
```

## Usage

First, require the `proxy-wrapper` module in your Node.js script:

```javascript
const Warp = require('proxy-wrapper');
```

### Class: Warp

The `Warp` class represents the Cloudflare Warp proxy server.

#### Constructor

To create an instance of the `Warp` class, use the following constructor:

```javascript
const proxy = new Warp(port, warpPath);
```

- `port` (number): The proxy port to be hosted on localhost, which will redirect to the proxy server.
- `warpPath` (string, optional): The path to the Cloudflare Warp CLI. If not provided, the module will attempt to locate it automatically based on the operating system.

#### Methods

##### setPort(port)

Sets the proxy port to a new value.

- `port` (number): The new proxy port.

Returns: void

##### reset()

Resets the Warp proxy server by disconnecting and reconnecting.

Returns: void

##### checkip([v])

Checks the IP address used by the Warp proxy server.

- `v` (string, optional): The IP version to check. Valid values are `'4'` for IPv4 (default) and `'6'` for IPv6.

Returns: Promise\<string> - The IP address.

##### disconnect()

Disconnects the Warp proxy server.

Returns: void

#### Static Methods

The following methods are static and can be called directly on the `Warp` class without creating an instance.

##### enableport(warp, port)

Enables the specified proxy port.

- `warp` (string): The path to the Cloudflare Warp CLI.
- `port` (number): The proxy port to enable.

Returns: void

##### connect(warp)

Connects to the Warp proxy server.

- `warp` (string): The path to the Cloudflare Warp CLI.

Returns: void

##### disconnect(warp)

Disconnects from the Warp proxy server.

- `warp` (string): The path to the Cloudflare Warp CLI.

Returns: void

##### reset(warp)

Resets the Warp proxy server by disconnecting and reconnecting.

- `warp` (string): The path to the Cloudflare Warp CLI.

Returns: void

##### checkip(v)

Checks the IP address used by the Warp proxy server.

- `v` (string): The IP version to check. Valid values are `'4'` for IPv4 (default) and `'6'` for IPv6.

Returns: Promise\<string> - The IP address.

## Examples

### Example 1: Basic Usage

```javascript
const Warp = require('proxy-wrapper');

// Create a new Warp instance with default settings
const proxy = new Warp(8080);

// Set a new proxy port
proxy.setPort(8888);

// Reset the Warp proxy server
proxy.reset();

// Check the IPv4 address
proxy.checkip('4')
  .then(ip => {
    console.log('IPv4 Address:', ip);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Disconnect from the Warp proxy server after a delay
setTimeout(() => {
  proxy.disconnect();
  console.log('Disconnected from Warp proxy server.');
}, 5000);
```

This example creates a new `Warp` instance with a proxy port of 8080. It then sets a new proxy port to 8888 and resets the Warp proxy server. Next, it checks the IPv4 address using the `checkip` method. Finally, it disconnects from the Warp proxy server after a 5-second delay.

### Example 2: Checking IP Address and Resetting

```javascript
const Warp = require('proxy-wrapper');

// Create a new Warp instance with default settings
const proxy = new Warp(8888);
console.log(proxy);

(async () => {
  // Reset the Warp proxy server
  proxy.reset();

  const time = Date.now();
  const ip = await proxy.checkip();
  console.log(`[${Date.now() - time}ms]: IP Address ${ip}`);
})();
```

This example creates a new `Warp` instance with a proxy port of 8888. It then logs the `proxy` object to the console. After that, it resets the Warp proxy server and checks the IP address using the `checkip` method. The IP address is logged along with the elapsed time.

## License

This project is licensed under the [MIT License](LICENSE).

Note: The provided examples demonstrate the basic usage of the `proxy-wrapper` module. You can modify and expand upon these examples to suit your specific needs and requirements.
