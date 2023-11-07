import {auth,rs,util} from 'qiniu'

const safeurl=util.base64ToUrlSafe("race:123.m3u8")
let options:rs.PutPolicyOptions = {
    scope: "race",
  };

let accessKey = 'vZQSFjpbDHUo41UsXjvdJFLuEbLEonsMRdoI5uDH';
let secretKey = '29kmmlAMZnAQVfBOOo8ujnUtUZa038ATLMYg2Ysh';


export function createToken(){
    let putPolicy = new rs.PutPolicy(options);
    let mac = new auth.digest.Mac(accessKey, secretKey);
    let uploadToken=putPolicy.uploadToken(mac);
    return uploadToken
}