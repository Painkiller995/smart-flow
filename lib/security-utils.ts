import 'server-only';

import { timingSafeEqual } from 'crypto';

export function isValidSecret(secret: string, apiSecret: string): boolean {
    if (!apiSecret) {
        return false;
    }

    try {
        return timingSafeEqual(Buffer.from(secret), Buffer.from(apiSecret));
    } catch {
        return false;
    }
}