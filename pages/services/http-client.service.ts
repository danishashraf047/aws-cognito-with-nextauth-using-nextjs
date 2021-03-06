export function useHttpClientService() {
    const request = async (args: {
        url: string,
        method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH"
        body?: object,
        headers?: object
    }) => {
        const result = await fetch(args.url, {
            body: args.body ? JSON.stringify(args.body) : null,
            method: args.method,
            headers: args.headers ? args.headers : {
                "Content-Type": "application/json; charset=utf8"
            } as any
        });
        const data = await result.json();
        return { statusCode: result.status, data: data };
    }

    return { request };
}