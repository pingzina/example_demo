//静态资源的路径请求的路径
const baseUrl=process.env.NODE_ENV=="production"?'./':'./';

//index.html放置的地方
const indexPath=process.env.NODE_ENV=="production"?process.env.VUR_APP_INDEX_PATH:'index.html';

//配置需要重启
module.exports={
    //请求资源的路径
    publicPath:'./',
    //输出的文件的目录
    outputDir:"dist",
    //静态资源打包放置的文件夹
    assetsDir:"static",
    //index.html文件的位置
    indexPath:"index.html",
    //配置跨域
    devServer:{
        proxy:{
            '/node':{
                target:'http://192.144.235.248',
                secure:true,
                changeOroigin:true,
                // pathRewrite: {
                //     '^/api': ''
                // }
            },
            '/php':{
                target:'http://localhost:8000/fetch-upload/controller/',
                secure:true,
                changeOroigin:true,
                pathRewrite: {
                    '^/php': ''
                },
            }
        }
    }
}