import Koa from 'koa'
import router from 'koa-simple-router'
import co from 'co'
import render from 'koa-swig'
import serve from 'koa-static'
import config from './config'
import controllerInit from './controllers'
const app =new Koa();
//配置swig模板引擎
app.context.render = co.wrap(
    render({
        root: config.viewDir,
        autoescape: true,
        cache: 'memory', // disable, set to false
        ext: 'html',
        varControls:["[[","]]"],
        writeBody: false
      })
);
controllerInit(app,router);
app.use(serve(config.staticDir));
app.listen(config.port,()=>{
    console.log(`server is ${config.port}`);
});