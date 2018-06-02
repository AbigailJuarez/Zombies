var http=require('http');
var path= require('path');
var express= require('express');
var logger= require('morgan');
var bodyParser= require('body-parser')



var app =express();
app.set('views',path.resolve(__dirname,'views'));
app.set('view engine','ejs');
var entries =[];
app.locals.entries=entries;


var publicPath= path.join(__dirname,'public');
app.use('/recursos',express.static(publicPath));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false})); 

app.get('/index',(request,response)=> response.render('index'));

app.get('/clase',(request,response)=> response.render('Clase'));
app.get('/armas',(request,response)=> response.render('Armas'));
app.get('/victimas',(request,response)=> response.render('Victimas'));


app.post('/new-entry',(request,response)=>{
    if(!request.body.title || !request.body.body){
        response.status(400).send('¡Las victimas deben ser registradas!');
        return;
    }
    entries.push({
        title: request.body.title,
        body: request.body.body,
        created: new Date()
    });
    response.redirect('/');
});
app.use((request,response)=>response.status(404).render('404'));
http.createServer(app).listen(3000,()=>
console.log('corriendo en el puerto 3000')
);