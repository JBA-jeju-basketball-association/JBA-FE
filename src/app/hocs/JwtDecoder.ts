import base64 from "base-64"
export default function JwtDecoder(jwtToken:string){

    //jwt토큰 디코딩
    let payload:string = jwtToken.substring(jwtToken.indexOf('.')+1,jwtToken.lastIndexOf('.'));
    let decodingInfo:string = base64.decode(payload);
    let decodingInfoJson = JSON.parse(decodingInfo);

    return decodingInfoJson;

}