

export function getRedirectTo(type, post) {
    let path = ''
    if(type === 'boss'){
        path = '/boss'
    } else {
        path = '/pro'
    }
    if(!post){
        path += 'info'
    }
    
    return path
}