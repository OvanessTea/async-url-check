interface UrlCheckResult {
    status: 'success' | 'error';
    httpStatus?: number;
    error?: string
}

export class UrlChecker {
    async check(url: string): Promise<UrlCheckResult> {
        try {
            const response = await fetch(url, {
                method: 'HEAD',
                signal: AbortSignal.timeout(10_000),
            });

            return {
                status: 'success',
                httpStatus: response.status,
            };
        } catch (error) {
            return {
                status: 'error',
                error: error instanceof Error
                    ? error.message
                    : 'Unknown error'
            }
        }
    }
}