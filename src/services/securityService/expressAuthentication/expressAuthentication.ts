import express from "express";
import SecurityService from "../securityService";
import AuthenticationError from "../../../exceptions/authenticationError";

export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "api_key") {
        const service = SecurityService.getInstance();
        const key = request.headers["authorization"];
        if (key && key.length == 64) {
            for (const permission of scopes ?? []) {
                if (
                    !(await service.checkIfKeyHavePermission(key, permission))
                ) {
                    throw new AuthenticationError(
                        "The key has no permissions to access this content."
                    );
                }
            }
            return;
        }
        throw new AuthenticationError(
            "The key, or the absence of a key, prevents you from accessing the content."
        );
    }
}
