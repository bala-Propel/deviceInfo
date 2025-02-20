import { Injectable } from '@nestjs/common';
import * as os from 'os';
import * as macaddress from 'macaddress';
import * as useragent from 'express-useragent';
import * as geoip from 'geoip-lite';

@Injectable()
export class SystemInfoService {
    async getSystemInfo(userAgentString: string) {
        const hostname = os.hostname();
        const osType = os.type();
        const osPlatform = os.platform();
        const osVersion = os.release();
        const networkInterfaces = os.networkInterfaces();

        let ip = 'Unknown';
        let macId = 'Unknown';

        for (const interfaceName in networkInterfaces) {
            const interfaces = networkInterfaces[interfaceName];
            if (interfaces) {
                for (const net of interfaces) {
                    if (net.family === 'IPv4' && !net.internal) {
                        ip = net.address;
                        break;
                    }
                }
            }
        }

        macId = await macaddress.one();

        const userAgent = useragent.parse(userAgentString);
        console.log(userAgent)
        const filteredUserAgent = Object.fromEntries(
            Object.entries(userAgent).filter(([_, value]) => value && value !== false && value !== '')
        );

        function isPrivateIP(ip: string): boolean {
            return /^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/.test(ip);
        }
        let geoIp = isPrivateIP(ip) ? { message: "Private IP Detected" } : geoip.lookup(ip) || {};
        return { hostname, ip, macId, osType, osPlatform, osVersion, userAgent: filteredUserAgent, geoIp };
    }
}
