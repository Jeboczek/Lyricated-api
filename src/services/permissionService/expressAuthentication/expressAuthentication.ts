import express from "express";
import PermissionService from "../permissionService";

export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "apiKey") {
        const service = PermissionService.getInstance();
        const key = request.headers["Authentication"];
        if (key && key.length === 64 && typeof key === "string") {
            for (const permission of scopes ?? []) {
                if (
                    !(await service.checkIfKeyHavePermission(key, permission))
                ) {
                    await Promise.reject(
                        "The key has no permissions to access this content."
                    );
                }
            }
            await Promise.resolve();
        }
        await Promise.reject(
            "The key, or the absence of a key, prevents you from accessing the content."
        );
    }
}
