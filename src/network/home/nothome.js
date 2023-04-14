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