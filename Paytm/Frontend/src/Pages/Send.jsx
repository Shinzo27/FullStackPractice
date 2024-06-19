import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import axios from "axios";

const Send = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  const sendMoney = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/api/v1/account/transfer", {
      to: id,
      amount,
    }).then(console.log("Transferred"))
  };

  return (
    <div className="">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex justify-center items-center text-white gap-1">
                <label
                  htmlFor="email"
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                >
                  Send Money
                </label>
              </div>
              <form className="space-y-4 md:space-y-6" action="#">
                <div className="flex justify-center items-center text-white gap-1">
                  <div className="text-3xl">
                    <IoPersonCircleOutline />
                  </div>
                  <label
                    htmlFor="email"
                    className="text-2xl font-medium text-gray-900 dark:text-white"
                  >
                    {name}
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Amount ( In Rs )
                  </label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    placeholder="Enter Amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={(e) => sendMoney}
                >
                  Initiate Transfer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Send;
