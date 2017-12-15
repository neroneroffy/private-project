/**
 * Created by haita on 2017/12/15 0015.
 */
export function getRedirectToUrl(data) {

    let url = data.type === 'boss'?'/boss':'/seeker';
    if(!data.avatar){
        url += 'info'
    }
    return url;
}