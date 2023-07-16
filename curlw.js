const http = require('http');
const https = require('https');
const {exec} = require('child_process')

function parsecurl(responseString) {

  // Parse the response
const responseLines = responseString.split('\r\n');

// Extract status code
const statusCode = parseInt(responseLines[0].split(' ')[1]);

// Extract headers
const headers = {};
for (let i = 1; i < responseLines.length; i++) {
  const line = responseLines[i];
  if (line.trim() === '') {
    // Empty line indicates the end of headers
    break;
  }
  const [key, value] = line.split(': ');
  headers[key] = value;
}

// Extract body
const bodyStartIndex = responseString.indexOf('\r\n\r\n') + 4;
const body = responseString.substring(bodyStartIndex);
const nb = body.split(headers[Object.keys(headers)[Object.keys(headers).length-1]]+'\n\n')[1];
return {statusCode,headers,body}
}
/**
 * curl wrapper
 * 
 * @param {string} method 
 * @param {{}} headers 
 * @param {string} url 
 * @param {"http://*:*"} proxy
 * @returns {Promise<{status:number,headers:{},body:string}>}
 */

function executeCurl(method, headers, url,post,proxy) {
  return new Promise((resolve) => {

  
  // Construct the curl command
  let command = `curl.exe --http2 -is -X ${method.toUpperCase()} ${url} --proxy ${proxy}`;
  if ((method.toUpperCase() == 'POST' || method.toUpperCase() == 'PUT') && post) {
    command += ` -d '${post.split('\n').join('')}'`
  }
  // Add headers to the command if provided
  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      command += ` -H "${key}: ${value}"`;
    });
  }

  // Execute the curl command
  exec(command, (error, stdout, stderr) => {
    const parsed = parsecurl(stdout);
    //console.log(parsed.statusCode,url)
    if (parsed.statusCode+'' == 'NaN') console.log(stdout,stderr)
    if (command.includes('--proxy')) {
      resolve({status:parsed.statusCode,headers:parsed.headers,body:parsed.body})
    } else {
      resolve({status:parsed.statusCode,headers:parsed.headers,body:parsed.body})
    }
  });
  })
}
module.exports = executeCurl;
