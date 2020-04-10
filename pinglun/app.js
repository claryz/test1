
var fs = require('fs')
var http = require('http')
var url = require('url')

var template = require('art-template')

var comments = [
    {name:'张三',message:'我先试试看1',dataTime:'2020-05-01'},
    {name:'李四',message:'我先试试看2',dataTime:'2020-05-01'},
    {name:'王五',message:'我先试试看3',dataTime:'2020-05-01'},
]

http.createServer(function (request, response) {

    // var url = request.url;
    // console.log(url);
    // url.parse(请求路径，true)
    // true：将字符串转换成对象
    var pathnameObj = url.parse(request.url,true)
    var pathname = pathnameObj.pathname;
    // console.log(pathname)
    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) { return response.end('404') }
           var htmlStr =  template.render(data.toString(),{
                comments:comments
            })
            response.end(htmlStr)
        })
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) { return response.end('404') }
            response.end(data)
        })
    } else if (pathname === '/pinglun') {
        var con = pathnameObj.query;
        comments.unshift(con);
        console.log(comments)
        // 根据状态码判断是否需要重定向，
        //statusCode = 302  如果点击提交，重定向到根目录
        response.statusCode = 302;
        response.setHeader('Location','/');
        response.end()
    }else{
        fs.readFile('./views/404.html',function(err,data){
            response.end(data)
        })
    }
}).listen(3500, function () {
    console.log('server is running....')
})


//通过ajax请求，由客户端去服务端，页面从上向下执行，遇见ajax就执行操作，服务端响应后进行一系列操作
//如，返回html文件，即，点击，给出命令，后台收到响应，跳转到我需要的下一步操作的html文件
//1.启动服务，根据路径不同，转到不同的页面
//2.监听3500（大框架）
//3.把index页面加载进来
//4.判断，如果是post请求，就跳转到post页面，if else，如果是/，跳转到我的index.html页面
//5.如果是评论，跳转到评论，点击发表，跳转到评论页，通过 url.parse(请求路径，true)将字符串转换成对象
//6.rander渲染
//7.都不是的时候，else，到404
//8.根据状态码，重定向判断
//9.end
//10.xiugai 修改
//youici 第二次修改测试
//disanci 第三次测试