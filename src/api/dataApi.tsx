const _api = 'https://fakestoreapi.com/';

enum HTTPMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type RequestBody = string | FormData | Blob | BufferSource | URLSearchParams;

const _request = async (url: string, method: HTTPMethods = HTTPMethods.GET, body?: RequestBody, headers?: {}) => {
    try {
        const response = await fetch(url, {method, body, headers})      
        if(!response.ok) {
            throw new Error(`Could not fetch ${url}, status${response.status}`)
        }
        const data = await response.json();
        return data;
    } catch (e) {
        throw e;
    }
}

export function getAll() {
    return _request(`${_api}products`)
}

export function getSingleProduct(id: number) {
    return _request(`${_api}products/${id}`)
}
