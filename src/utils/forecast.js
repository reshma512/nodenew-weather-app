const request=require('request')
 

const forecast=(latitude,longitude,callback)=>{
 const url='http://api.weatherstack.com/current?access_key=0b8023ae53492424f5fa5ca3b9512cca&query='+ latitude +','+ longitude 
 console.log("url       ",url)
 request({url,json:true},(error,{body} )=>{
   //  console.log("response of forecast       ",response)
    if(error){
        callback('unable to connect to weather services',undefined)
    }else if(body.error){
        callback('Unable to find location.Try another search',undefined)
    }else{
      //  console.log("qqqqqqqqqqqvv     ", response.body)
   
       callback(undefined, body.current.weather_descriptions[0]  + '  . It is currently ' + body.current.temperature+' degrees out.There is a '+ body.current.precip +' % chance of rain. ' )
    }

})
 }
 module.exports= forecast
 //removed response because 
 //we are referencing body which doest exits as standalone variable,because we destructure it above