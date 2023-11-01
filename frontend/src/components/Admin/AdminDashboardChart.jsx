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

const AdminDashboardChart = () => {
  const { allBookings } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);
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
  let updatedBookingsCount = [];

  for (const i of last7Days) {
    let total = [];
    const dateObject = new Date(i);
    const dayOfWeek = dateObject.getDay();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const dayName = daysOfWeek[dayOfWeek];
    const filterBookings = allBookings?.filter(
      (item) =>
        (item.bookingStatus === "checked-in" ||
          item.bookingStatus === "checked-out") &&
        item.checkinDate.slice(0, 10) === i
    );
    if (filterBookings && filterBookings.length > 0) {
      updatedBookingsCount.push({
        name: dayName,
        bookings: filterBookings?.length,
      });

      for (const price of filterBookings) {
        total.push(price.totalPrice);
      }

      const totalPrice = total?.reduce((acc, num) => acc + num, 0);
      updatedBookingData.push({
        day: dayName,
        amount: (totalPrice * 20) / 100,
      });
      total = [];
    } else {
      updatedBookingsCount.push({
        name: dayName,
        bookings: filterBookings?.length,
      });
      updatedBookingData.push({
        day: dayName,
        amount: 0,
      });
    }
  }

  const colorsBar = [
    "#f2180c",
    "#f2d70c",
    "#6cf20c",
    "#07b9f0",
    "#d00be6",
    "#e60b7c",
    "#07aef5",
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#c21333",
    "#a88b32",
    "#83a832",
    "#c21385",
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="  flex justify-center pb-10 gap-[2rem] flex-wrap    items-start ">
      <div className="bg-[#090230] shadow-lg rounded-md overflow-x-scroll md:overflow-x-hidden w-[20rem] md:w-[30rem] px-  ml-10 ">
        <div className=" font-Roboto font-medium text-[25px]  text-gray-400 py-5 flex justify-center">
          Last 7 days Earnings
        </div>
        <div className="  border-t">
          <BarChart
            width={500}
            height={300}
            data={updatedBookingData}
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
            <Bar dataKey="amount" fill="#1f9c34">
              {updatedBookingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorsBar[index % 20]} />
              ))}
            </Bar>
            {/* <Bar dataKey="bookings" fill="#82ca9d"  /> */}
          </BarChart>
        </div>
      </div>
      <div className="bg-[#090230] shadow-lg rounded-md overflow-x-scroll md:overflow-x-hidden w-[20rem]  md:w-[30rem] px- ml-10">
        <div className=" font-Roboto font-medium text-[25px]  text-gray-400 py-5 flex justify-center">
          Last 7 days Bookings
        </div>
        <div className=" border-t">
          <PieChart width={500} height={300}>
            <Pie
              data={updatedBookingsCount}
              cx="50%"
              cy="50%"
              labelLine={true}
              // label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="bookings"
            >
              {updatedBookingsCount.map((entry, index) => (
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

export default AdminDashboardChart;
