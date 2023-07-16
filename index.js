const cp = require('child_process');
const http = require('http2');
const os = require('os');
const curl = require('./curlw');

/**
 * the cloudflare warp proxy server class
 */
class Warp {
    /**
     * 
     * @param {number} port the proxy port to be hosted on localhost which will redirect to proxy server
     * @param {string} warp path to warp
     */
    constructor(port,warp) {
        if (warp !== '' || warp == undefined) {
            if (os.platform() == 'win32') {
                this.warp='"C:\\Program Files\\Cloudflare\\Cloudflare WARP\\warp-cli"'
            } else if (os.platform() == 'linux') {
                this.warp='warp-cli'
            } else {
                this.warp='warp-cli'
            }
        } else {
            this.warp = warp
        }
        //console.log(this.warp)
        this.port = port
        Warp.enableport(this.warp,port);
        /**
         * 
         * @param {number} port 
         * @returns {void}
         */
        this.setPort = (port) => {
            return Warp.enableport(this.warp,port)
        }/**
         * 
         * @returns {void}
         */
        this.reset = () => {
            return Warp.reset(this.warp)
        }
        /**
         * 
         * @param {'4'|'6'} v ipv6 or ipv4
         * @returns {string}
         */
        this.checkip = Warp.checkip
        this.disconnect = () => {
            Warp.disconnect(this.warp)
        }
        Warp.init(this.warp);
    }
    static init(warp) {
        return new Promise((resolve , reject) => {
            cp.exec(warp+' -V' , (error,stdout,stderr) => {
            if (error) {
                reject(error)
            } else if (stderr !== '') {
                reject(stderr)
            } else {
                this.version = stdout.replace('warp-cli ','');
                resolve(this.version)
            }
            })
        })
    }
    /**
     * 
     * @param {string} warp 
     * @param {number} port 
     */
    static enableport(warp,port) {
        //console.log(warp+' set-proxy-port '+port)
        cp.execSync(warp+' set-proxy-port '+port)
    }
    /**
     * 
     * @param {string} warp 
     */
    static connect(warp) {
        cp.execSync(warp+' connect')
    }
    /**
     * 
     * @param {string} warp 
     */
    static disconnect(warp) {
        cp.execSync(warp+' disconnect')
    }/**
     * 
     * @param {string} warp 
     */
    static reset(warp) {
        Warp.disconnect(warp);
        Warp.connect(warp)
    }
    /**
     * 
     * @param {string} warp 
     * @param {'4'|'6'} v 
     */
    static checkip(v=4) {
        return new Promise(async (resolve ,rej) => {
            const url = `ipv${v}.myip.wtf/text`
            const req = await curl('GET',{},url,'','socks://127.0.0.1:'+this.port)
            resolve(req.body.trim());
        })
    }
}
module.exports = Warp
