"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPutSignedUrl = exports.getGetSignedUrl = exports.s3 = void 0;
const AWS = require("aws-sdk");
const config_1 = require("./config/config");
// Configure AWS
const credentials = new AWS.SharedIniFileCredentials({
    profile: config_1.config.aws_profile,
});
AWS.config.credentials = credentials;
exports.s3 = new AWS.S3({
    signatureVersion: "v4",
    region: config_1.config.aws_region,
    params: { Bucket: config_1.config.aws_media_bucket },
});
// Generates an AWS signed URL for retrieving objects
function getGetSignedUrl(key) {
    const signedUrlExpireSeconds = 60 * 100;
    return exports.s3.getSignedUrl("getObject", {
        Bucket: config_1.config.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds,
    });
}
exports.getGetSignedUrl = getGetSignedUrl;
// Generates an AWS signed URL for uploading objects
function getPutSignedUrl(key) {
    const signedUrlExpireSeconds = 60 * 5;
    return exports.s3.getSignedUrl("putObject", {
        Bucket: config_1.config.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds,
    });
}
exports.getPutSignedUrl = getPutSignedUrl;
//# sourceMappingURL=aws.js.map