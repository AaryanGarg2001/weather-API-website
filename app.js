const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{

    var city=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=adbc0f4791883f6868216d74e04014f9&units=metric";

    https.get(url,(responce)=>{
        console.log(responce.statusCode);
        if(responce.statusCode===200){
        responce.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const icon =weatherData.weather[0].icon;
            const imgurl="http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature is "+temp+" degree Celcius</h1>");
            res.write("<img src=" + imgurl + ">");
            res.send();
        });}
        else
        res.send("<h1>Enter valid city name</h1>");
    });
});

app.listen(3000,()=>{
    console.log("server is up");
});
