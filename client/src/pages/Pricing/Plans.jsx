import React, { useState } from "react";
import axios from "axios";
import "./Pricing.css";


const Plans = () => {
  const [plan, setPlan] = useState([
    {
      id: "free",
      name: "Free Plan",
      price: 0,
      maxQuestionsPerDay: 1,
    },
    {
      id: "silver",
      name: "Silver Plan",
      price: 100,
      maxQuestionsPerDay: 5,
    },
    {
      id: "gold",
      name: "Gold Plan",
      price: 1000,
      maxQuestionsPerDay: Infinity,
    },
  ]);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_1idD4rWM9QQap1",
      amount: data.amount,
      currency: data.currency,
      name: plan.name,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl =
          "https://my-stackoverflow-clone-80q1.onrender.com/api/payment/verify";
          // "http://localhost:5000/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (selectedPlanId) => {
    try {
      const selectedPlan = plan.find((plan) => plan.id === selectedPlanId);
      const orderUrl =
        "https://my-stackoverflow-clone-80q1.onrender.com/api/payment/orders";
      // "http://localhost:5000/api/payment/orders";
      const { data } = await axios.post(orderUrl, {
        amount: selectedPlan.price,
      });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='subscription'>
      <h1 className='head_title'>Subscription</h1>
      <h3 className='plan_title'>Simple, straightforward pricing.</h3>
      <div className='plan'>
        <div className='box'>
          <div className='plan_container card-red'>
            <p className='plan_name'>{plan[0].name}</p>
            <p className='plan_questionPerDay'>
              maxQuestionsPerDay : {plan[0].maxQuestionsPerDay}
            </p>
            <p className='plan_price'>
              Price : <span>&#x20B9; {plan[0].price}</span>
            </p>
            <button className='buy_btn'>start now</button>
          </div>
          <div className='plan_container card-orange'>
            <p className='plan_name'>{plan[1].name}</p>
            <p className='plan_questionPerDay'>
              maxQuestionsPerDay : {plan[1].maxQuestionsPerDay}
            </p>
            <p className='plan_price'>
              Price : <span>&#x20B9; {plan[1].price}</span>
            </p>
            <button onClick={() => handlePayment("silver")} className='buy_btn'>
              Buy Plan
            </button>
          </div>
          <div className='plan_container card-blue'>
            <p className='plan_name'>{plan[2].name}</p>
            <p className='plan_questionPerDay'>
              maxQuestionsPerDay : {plan[2].maxQuestionsPerDay}
            </p>
            <p className='plan_price'>
              Price : <span>&#x20B9; {plan[2].price}</span>
            </p>
            <button onClick={() => handlePayment("gold")} className='buy_btn'>
              Buy Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
