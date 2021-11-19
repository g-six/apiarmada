export function prettifyResponse(body: string) {
    return JSON.stringify(JSON.parse(body), null, 3)
}