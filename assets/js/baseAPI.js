const baseUrl = 'http://www.liulongbin.top:3007'
$.ajaxPrefilter(option =>{
    opation.url = baseUrl + opation.url
})