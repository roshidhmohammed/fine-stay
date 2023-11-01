import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getAllBookings } from "../../redux/actions/booking";
import { getPartnerAllProperties } from "../../redux/actions/property";

const PartnerDashboardChart = () => {
  const { allBookings } = useSelector((state) => state.bookings);
  const { properties } = useSelector((state) => state.property);
  const { partner } = useSelector((state) => state.partner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(getPartnerAllProperties(partner?._id));
  }, [dispatch, partner]);

  function getLast7Days() {
    const today = new Date();
    const last7Days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      last7Days.push(date.toISOString().slice(0, 10)); // Format as "YYYY-MM-DD"
    }

    return last7Days;
  }

  const last7Days = getLast7Days();

  let updatedBookingData = [];

  for (const date of last7Days) {
    const filterBookings = properties?.map((i) =>
      allBookings?.filter(
        (item) =>
          item.propertyId === i._id &&
          item.checkinDate.slice(0, 10) === date &&
          (item.bookingStatus === "checked-in" ||
            item.bookingStatus === "checked-out")
      )
    );
    updatedBookingData.push(filterBookings);
  }

  let total = [];

  for (let i of updatedBookingData) {
    if (i?.length > 0) {
      for (let j of i) {
        if (j?.length > 0) {
          for (let k of j) {
            total.push({
              day: k.checkinDate.slice(0, 10),
              amount: k.totalPrice,
            });
          }
        }
      }
    }
  }
  let newPriceBar = [];
  let newPricePie = [];
  for (const date of last7Days) {
    const filter = total.filter((i) => i.day === date);
    if (filter?.length !== 0) {
      let newPrice = filter.reduce((acc, num) => acc + num.amount, 0);
      newPriceBar.push({
        day: date.slice(5, 10),
        dailyEarnings: (newPrice * 80) / 100,
      });
      newPricePie.push({
        name: date.slice(5, 10),
        bookings: filter.length,
      });
    } else {
      newPriceBar.push({
        day: date.slice(5, 10),
        dailyEarnings: 0,
      });
      newPricePie.push({
        name: date.slice(5, 10),
        bookings: 0,
      });
    }
  }
  // console.log(newPriceBar)
  // for (let date=0;date<last7Days.length; date++){
  //     for ( let i=0; i< total.length; i++){
  //         if(last7Days[date] === total[i].day){
  //             price.push({
  //                 dat:total[i].day,
  //                 amoun:total[i].amount

  //             })
  //             break
  //         } else {
  //             price.push({
  //                 dat:last7Days[date],
  //                 amoun:0

  //             })
  //             break
  //         }
  //     }
  // }
  // console.log(price)

  //   for (const date of last7Days){
  //     let total =[]
  //     const dateObject = new Date(date);
  //     const dayOfWeek = dateObject.getDay();
  //     const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  //     const dayName = daysOfWeek[dayOfWeek];
  //     updatedBookingData2?.map((i) =>
  //      {
  //     const filter = i?.filter((booking) => (booking.checkinDate.slice(0, 10) === date) &&
  //     (booking.bookingStatus === "checked-in" || booking.bookingStatus === "checked-out" )
  //     )
  //     // console.log(filter)
  //     if(filter && filter.length>0 ){

  //         for(const price of filter){
  //             total.push(price.totalPrice)
  //         }
  //         // console.log(total)
  //         const totalPrice = total?.reduce((acc,num) => acc+num,0)
  //          updatedBookingData.push({
  //             day:dayName,
  //             amount:(totalPrice *80)/ 100
  //          })
  //          total=[]
  //     } else {
  //         updatedBookingData.push({
  //             day:dayName,
  //             amount:0
  //          })

  //     }
  // //     return(
  // // filter
  // //         // filter?.length > 0 ? (
  // //         //     for(const price of filter){
  // //         //         total.push(price.totalPrice)
  // //         //     }
  // //         // ):(

  // //         // )

  // //     )

  //         }

  //     )

  //   }
  // console.log(updatedBookingData)
  // console.log(updatedBookingData)
  //   console.log(total)

  // console.log(filterBookingByPartnerProp)

  //   const colorsBar = [
  //     "#f2180c",
  //     "#f2d70c",
  //     "#6cf20c",
  //     "#07b9f0",
  //     "#d00be6",
  //     "#e60b7c",
  //     "#07aef5",
  //   ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#c21333",
    "#a88b32",
    "#83a832",
    "#c21385",
  ];
  return (
    <div className="  flex justify-center md:justify-start pb-10 md:gap-[3.3rem] gap-[1rem] flex-wrap    items-start">
      <div className="bg-[rgb(254,254,254)] shadow-lg rounded-md overflow-x-scroll md:overflow-x-hidden w-[20rem] md:w-[30rem] px-  md:ml-10 ">
        <div className=" font-Roboto font-medium text-[25px]  text-gray-600 py-3 flex justify-center">
          Last 7 days Earnings
        </div>
        <div className="  border-t">
          <BarChart
            width={500}
            height={300}
            data={newPriceBar}
            margin={{
              top: 50,
              right: 60,
              left: 5,
              bottom: 20,
            }}
          >
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="dailyEarnings" fill="#1b3a85"></Bar>
          </BarChart>
        </div>
      </div>
      <div className="bg-[rgb(254,254,254)] shadow-lg rounded-md overflow-x-scroll md:overflow-x-hidden w-[20rem] md:w-[30rem] px-  md:ml-10 ">
        <div className=" font-Roboto font-medium text-[25px]  text-gray-600 py-3 flex justify-center">
          Last 7 days Bookings
        </div>
        <div className="  border-t">
          <PieChart width={500} height={300}>
            <Pie
              data={newPricePie}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey="bookings"
            >
              {newPricePie.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboardChart;
