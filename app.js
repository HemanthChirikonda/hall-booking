const express = require('express')
const app = express()
const port = 3000
const body_parser= require('body-parser');
app.use(body_parser.json());
class room{
  avilable;
  status;
  constructor(noOfSeats=5, amenities =["Cleaning stuff (broom, mop, cleaning liquids)","Wifi / Internet Access"], pricePerHr=700){
    this.noOfSeats= noOfSeats;
    this.amenities= amenities;
    this.pricePerHr= pricePerHr;
    this.avilable= true;
    this.status= 'not booked';
  }
}

class customer{
  constructor(name,age){
this.name=name;
this.age=age;
this.bookeddata=[];
  }
}


let roomsAry=[];
let bookedroomsAry=[];
let customers=[];

app.post('/room/book',(req,res)=>{
  let room = roomsAry.find(a => a.id = req.body.id)
  let co= customers.find(a => a.id = req.body.C_id);
  if(room !== undefined && co !== undefined ){
    if (room.room.avilable === true) {
      room.room.avilable = false;
      room.room.status = 'booked';
      bookedroomsAry.push({
        "room_id": room.id,
        "room_status":room.room.status,
        "customer":customers.find(a => a.id = req.body.C_id).customer.name,
        "date": req.body.date,
        "st_time": req.body.st_time,
        "end_time": req.body.end_time
      })
     
 co.customer.bookeddata.push(bookedroomsAry[bookedroomsAry.length-1]);
      res.json({
        "message": "room booked"
       // "re": room
      })
    } else {
      res.json({
        "message": "room is not available"
        //"re":room
      })}
  } else {
    res.json({
      "message": "room/customer is not in the list"
    })
  }

//res.json(req.body.date);
})

app.get ('/room/bookedrooms',(req,res)=>{
res.json(bookedroomsAry);

})

app.post('/room',(req,res)=>{
roomsAry.push(
  {
    "id": roomsAry.length+1,
    "room": new room(req.body.noOfSeats,req.body.amenities,req.body.pricePerHr)})
    res.json({
      "message":"room created"
    })

})
app.get('/rooms',(req,res)=>{
res.json(roomsAry);
})

app.post('/customer',(req,res)=>{

  customers.push({
    "id":customers.length+1,
    "customer": new customer(req.body.name, req.body.age)
  })
  res.json({
    "message":"customer created"
  })
})

app.get('/costomers',(req,res)=>{
  res.json(customers);

})

app.get('/customers/bookedrooms',(req,res)=>{

let any= customers.find((a)=>{
 if(a.customer.bookeddata.length!==0){
   return a;
 } 
});
let out=[];
bookedroomsAry.forEach((element) => {
  out.push({
    "room_id": element.room_id,
    "customer":element.customer,
    "date": element.date,
    "st_time": element.st_time,
    "end_time": element.end_time
  })
});
  res.json(out);
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

