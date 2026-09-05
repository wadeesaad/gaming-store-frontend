type Room ={
    id: number ;
    name: string;
  
};
type  Place ={
    id: number ;
    roomid: number;
    label: string;
    type: string;
};
export const rooms: Room[]=[
    { id:1 , name:"Room1"},
    { id:2 , name:"Room2"},
    { id:3 , name:"Room3"},
    { id:4 , name:"Room4"},
    { id:5 , name:"Room5"},
    { id:6 , name:"Room6"},
    ];
    export const places: Place[]=[
{ id:1 , roomid:1, label:"PC 1",type:"PC"},
{ id:2 , roomid:1, label:"PC 2",type:"PC"},
{ id:3 , roomid:1, label:"PC 3",type:"PC"},
{ id:4 , roomid:1, label:"PC 4",type:"PC"},
{ id:5 , roomid:1, label:"PC 5",type:"PC"},
{ id:6 , roomid:1, label:"PC 6",type:"PC"},
{ id:7 , roomid:1, label:"PC 7",type:"PC"},
{ id:8 , roomid:1, label:"PC 8",type:"PC"},
{ id:9 , roomid:1, label:"PC 9",type:"PC"},
{ id:10 , roomid:1, label:"PC 10",type:"PC"},
{ id:11 , roomid:2, label:"PC 1",type:"PC"},
{ id:12 , roomid:2, label:"PC 2",type:"PC"},
{ id:13 , roomid:2, label:"PC 3",type:"PC"},
{ id:14 , roomid:2, label:"PC 4",type:"PC"},
{ id:15 , roomid:2, label:"PC 5",type:"PC"},
{ id:16 , roomid:2, label:"PC 6",type:"PC"},
{ id:17 , roomid:2, label:"PC 7",type:"PC"},
{ id:18 , roomid:2, label:"PC 8",type:"PC"},
{ id:19 , roomid:2, label:"PC 9",type:"PC"},
{ id:20 , roomid:2, label:"PC 10",type:"PC"},
{ id:21 , roomid:3, label:"PlayStation 1",type:"PlayStation"},
{ id:22 , roomid:3, label:"PlayStation 2",type:"PlayStation"},
{ id:23 , roomid:4, label:"Billiard 1",type:"Billiard"},
{ id:24 , roomid:4, label:"Billiard 2",type:"Billiard"},
{ id:25 , roomid:5, label:"Foosball 1",type:"Foosball"},
{ id:26 , roomid:5, label:"Foosball 2",type:"Foosball"},
{ id:27 , roomid:6, label:"RacingSim 1",type:"RacingSim"},
{ id:28 , roomid:6, label:"RacingSim 2",type:"RacingSim"},
    ]
    type Reservation = {
        id: number;
        placeId: number;
        customerName: string;
        customerPhone: string;
        startTime: string;
        endTime: string;
        totalPrice: number;
        status: string;
      };
      export const reservations: Reservation[] = [
        {
          id: 1,
          placeId: 1,
          customerName: "Ali Hassan",
          customerPhone: "71123456",
          startTime: "2026-08-19T14:00",
          endTime: "2026-08-19T16:00",
          totalPrice: 4,
          status: "Booked",
        },
        {
          id: 2,
          placeId: 21,
          customerName: "Moamad Khalil",
          customerPhone: "71234567",
          startTime: "2026-08-19T15:00",
          endTime: "2026-08-19T17:00",
          totalPrice: 4,
          status: "Booked",
        },
        {
          id: 3,
          placeId: 23,
          customerName: "Omar Fadel",
          customerPhone: "76345678",
          startTime: "2026-08-18T10:00",
          endTime: "2026-08-18T12:00",
          totalPrice: 10,
          status: "Completed",
        },
        {
          id: 4,
          placeId: 25,
          customerName: "Hassan Mansour",
          customerPhone: "78456789",
          startTime: "2026-08-19T13:00",
          endTime: "2026-08-19T14:00",
          totalPrice: 3,
          status: "Booked",
        },
        {
          id: 5,
          placeId: 27,
          customerName: "Karim Nassar",
          customerPhone: "79567890",
          startTime: "2026-08-19T18:00",
          endTime: "2026-08-19T19:00",
          totalPrice: 5,
          status: "Booked",
        },
      ];
      
     
      
      
      