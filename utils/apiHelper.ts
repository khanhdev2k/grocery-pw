import {test, expect, request} from '@playwright/test'

export async function get( request: any, endpoint: any) {
    const response = await request.get(endpoint);
    return response.json()
}

export async function post(request: any, endpoint: any, data: any) {
    const response = await request.post(endpoint, {
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: JSON.stringify(data) 
    });
    return response.json();
}

// export async function delete( request , endpoint: any, data: any, token: any) {
//     const response = await request.delete( endpoint , 
//         {
//             headers: {
//                 { 
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json',
//                     'Authorization': 
//                 },
//             },
//             data: 
//             JSON.stringify(data)
//         }
//     )
// }
