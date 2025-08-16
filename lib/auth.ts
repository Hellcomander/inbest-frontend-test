import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    exp: number;
}

export function isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded.exp) return false;

        const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
        return decoded.exp > now;
    } catch (e) {
        return false;
    }
}
