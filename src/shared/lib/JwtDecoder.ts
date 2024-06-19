import base64 from "base-64"
export function JwtDecoder(jwtToken:string){

    //jwt토큰 디코딩
    let payload = jwtToken.split('.')[1]; // Base64 URL part of JWT
    let decodedPayload = base64.decode(payload);
    let utf8Payload = decodeURIComponent(escape(decodedPayload)); // Ensure UTF-8 encoding

    return JSON.parse(utf8Payload);

}