export function register(data) {
    return {
        // url: 'http://127.0.0.1:3001/user/register',
        url: 'http://82.156.7.135:3001/user/register',
        method: 'post',
        data: data,
    }
}
export function getOne(id) {
    return {
        url: 'http://82.156.7.135:3001/user/getOne',
        method: 'post',
        data: id,
    }
}