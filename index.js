# Proxy Wrapper

Proxy Wrapper is a Node.js module developed by aulolua that provides a convenient way to interact with the Cloudflare Warp proxy server. It allows you to manage the proxy settings, check the IP address, and perform other related operations.

## Prerequisites

Before using Proxy Wrapper, ensure you have the following prerequisites installed:

- [cURL](https://curl.se/) - Command-line tool for making HTTP requests.
- [Cloudflare Warp CLI](https://developers.cloudflare.com/warp-cli) - Command-line interface for managing Cloudflare Warp.

## Installation

To use Proxy Wrapper in your Node.js project, you need to install it using npm:

```
npm install proxy-wrapper
```

## Usage

First, require the `proxy-wrapper` module in your Node.js script:

```javascript
const Warp = require('proxy-wrapper');
```

### Class: Warp

#### Constructor

The `Warp` class represents the Cloudflare Warp proxy server. To create an instance of the `Warp` class, use the following constructor:

```javascript
const warp = new Warp(port, warpPath);
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

```javascript
const Warp = require('proxy-wrapper');

// Create a new Warp instance with default settings
const warp = new Warp(8080);

// Set a new proxy port
warp.setPort(8888);

// Reset the Warp proxy server
warp.reset();

// Check the IPv6 address
warp.checkip('6')
  .then(ip => {
    console.log('IPv6 Address:', ip);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Disconnect from the Warp proxy server
warp.disconnect();
```

## License

This project is licensed under the [MIT License](LICENSE).
