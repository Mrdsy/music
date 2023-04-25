import { request } from "../request";
// 轮播图
export function getbanner(){
    return request({
        url:'/banner'
    })
}
// 推荐歌单
export function getpersonalized(){
    return request({
        url:'/personalized'
    })
}
//获得用户信息，歌单，收藏
export function getplaylist(uid){
    return request({
        url:'/user/playlist',
        params:{
            uid,
        }
    })
}
// 获得歌单的所有歌曲
export function getall(id,cookie){
    return request({
        url:'/playlist/detail',
        params:{
            id,
            cookie
        }
    })
}
// 获得歌曲详情
export function getsong(ids){
    return request({
        url:'/song/detail',
        params:{
            ids
        }
    })
}
//获取歌曲的url
export function geturl(cookie,id){
    return request({
        url:'/song/url/v1',
        params:{
            cookie,
            id,
            level:'higher'
        }
    })
}