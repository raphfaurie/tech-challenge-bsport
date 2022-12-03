const _authToken = " Token f18688960a8942c83d238b04e88389ac126bf55c"
const _baseURL = "https://api.staging.bsport.io/api/v1"

// Build the 'GET' request with the provided params and targets the provided endpoint.
export const getRequest = async (endpoint: string, params?: string[][]): Promise<Response> => {
    const reqParams = new URLSearchParams(params)
    return await fetch(_baseURL + endpoint + reqParams.toString(), {
        method: 'GET',
        headers: {
            "Authorization": _authToken,
            'Content-Type': 'application/json',
        },
    })
}

export const todayDate = (): string => {
	const now = new Date()
	const dd = now.getDate().toString().padStart(2, '0')
	const mm = now.getMonth().toString().padStart(2, '0')
	const yyyy = now.getFullYear().toString()
	return [yyyy,mm,dd].join("-")
}