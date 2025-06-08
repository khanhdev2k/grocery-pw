import {test, expect, request} from '@playwright/test'

export async function get( request, endpoint) {
    const response = await request.get(endpoint);
    return response.json()
}

export async function post(request, endpoint, data) {
    const response = await request.post(endpoint, {
        data: data
    })

    return response.json()
}