const express = require("express");
const app = express()
let request = require('request');
const port = process.env.PORT || 3000

let apiKey = '*****************************';
let city = 'portland';
let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=400066&date=22-05-2021`
var mainArr = []
request(url, function (err, response, body) {
    var result = ""
    if(err){
      console.log('error:', error);
    } else {
        const data2 = JSON.parse(body)
        data2.centers.forEach(ele=>{
            var mainObj = {}
           mainObj.address = ele.address
            mainObj.date = ele.sessions[0].date
            mainObj.available_capacity_dose1 = ele.sessions[0].available_capacity_dose1
            mainObj.available_capacity = ele.sessions[0].available_capacity
            mainArr.push(mainObj)
       })
       
        console.log(mainArr)
        mainArr.forEach(data=>{
            result += '<table style = background-color: green;>';
            result += "<tr><td><p>Available address</p>" +  data.address + "</td><td>" + data.date + "</td></tr><p>Available dose</p>" + data.available_capacity_dose1 + "</td></tr>";
        result += '</table>';
        })
        
    }
    
    app.get('/',(req,res)=>{
        res.send(result);
        // res.status(200).json({
        //     mainArr
        // })
   })

});
const server = app.listen(port,()=>{
    console.log("Server is launching"+port)
})