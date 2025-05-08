import Image from "next/image";
import React, { useState } from "react";
import Payment_Details_img from "../../../public/assets/images/common/Payment_Details_img.png";
import Highlighter from "../../common/highlighter";
import bank_outline from "../../../public/assets/icons/bank_outline.svg";
import card_outline from "../../../public/assets/icons/card_outline.svg";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import paymentMe from "../../../public/assets/images/common/paymentMe.png";
import BookAdemo from "../../common/bookAdemo";
import ArrowRight from "../../../public/assets/icons/arrowRight";
import InfoOutlineSharpIcon from "@mui/icons-material/InfoOutlineSharp";
import { PaymentConfirm } from "../../redux/OpenModal";
import { useDispatch } from "react-redux";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const [method, setMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    zipCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(formData.cardNumber)) {
      newErrors.cardNumber =
        "Card number must be in the format: 1234 5678 9012 3456";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required.";
    } else if (
      !/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/.test(formData.expiryDate)
    ) {
      newErrors.expiryDate =
        "Expiry date must be in the format: MM/YY or MM/YYYY";
    }
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
    }
    if (!formData.zipCode) {
      newErrors.zipCode = "ZIP code is required.";
    }
    if (!formData.country) {
      newErrors.country = "Country selection is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the corresponding error message
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(PaymentConfirm(true));
      // Proceed with payment processing
    }
  };

  return (
    <div className="relative h-full bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-no-repeat">
      <div className="page-container mx-auto container lg:px-12 px-0 flex">
        <div className="lg:w-[40%] w-full relative lg:flex hidden">
          <Image
            src={Payment_Details_img}
            alt="Payment_Details_img"
            className="w-full h-screen"
          />
          <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#ffffff_100%)] absolute bottom-0 w-full h-[50vh] p-8 flex flex-col justify-end gap-4">
            <p className="lg:text-[34px] text-[20px] text-[#060606E5] m-plus-rounded-1c-regular">
              Supercharging your sales teams with AI-Driven Selling
            </p>
            <hr className="border-[#060606]" />
            <p className="lg:text-[14px] text-[12px] text-[#060606E5] sora-regular">
              Realsales turns
              <br />
              Sales team into top Performers
            </p>
          </div>
        </div>
        <div className="lg:w-[60%] w-full flex flex-col items-center justify-center lg:py-0 py-4">
          <Highlighter highlight={"Report Session"} />
          <p className="lg:text-[30px] text-xl text-center text-[#060606E5] m-plus-rounded-1c-regular">
            Complete your payment
          </p>
          <h1 className="lg:text-6xl text-3xl text-[#060606E5] m-plus-rounded-1c-regular text-center">
            Payment Details
          </h1>
          <form
            className="w-full flex flex-col gap-4 p-8"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-2">
              <div className="border border-solid border-[#060606E5] p-1 w-fit h-fit rounded-full">
                <div className="bg-[#060606E5] w-3 h-3 rounded-full" />
              </div>
              <p className="sora-light text-[#060606] lg:text-lg text-base">
                Choose your payment method:
              </p>
            </div>
            <div className="flex lg:items-center items-start lg:flex-row flex-col gap-2">
              <div
                className={`shadow-[0px_2px_10px_0px_#00000033] border-2 border-solid ${
                  method === "card"
                    ? "border-[#06060633]"
                    : "border-[#00000000]"
                } bg-white flex items-center justify-between w-full rounded-[5px] px-2 py-1 cursor-pointer`}
                onClick={() => setMethod("card")}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={card_outline}
                    alt="card_outline"
                    className="w-10 h-8"
                  />
                  <p className="m-plus-rounded-1c-regular text-[#060606] lg:text-xl text-lg">
                    Card
                  </p>
                </div>
                <Radio
                  checked={method === "card"}
                  onClick={() => setMethod("card")}
                  sx={{
                    color: "#060606E5",
                    "&.Mui-checked": {
                      color: "#060606E5", // checked color
                    },
                  }}
                />
              </div>
              <div
                className={`shadow-[0px_2px_10px_0px_#00000033] border-2 border-solid ${
                  method === "netbanking"
                    ? "border-[#06060633]"
                    : "border-[#00000000]"
                } bg-white flex items-center justify-between w-full rounded-[5px] px-2 py-1 cursor-pointer`}
                onClick={() => setMethod("netbanking")}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={bank_outline}
                    alt="bank_outline"
                    className="w-10 h-8"
                  />
                  <p className="m-plus-rounded-1c-regular text-[#060606] lg:text-xl text-lg">
                    Netbanking
                  </p>
                </div>
                <Radio
                  checked={method === "netbanking"}
                  onClick={() => setMethod("netbanking")}
                  sx={{
                    color: "#060606E5",
                    "&.Mui-checked": {
                      color: "#060606E5", // checked color
                    },
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="shadow-[0px_2px_5px_0px_#0000004D] py-2 px-2.25 rounded-full w-fit h-fit bg-white">
                  <ArrowForwardIosSharpIcon />
                </div>
                <p className="lg:text-[16px] text-[14px] text-[#060606] text-start sora-regular">{`Other Payments`}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="border border-solid border-[#060606E5] p-1 w-fit h-fit rounded-full">
                <div className="bg-[#060606E5] w-3 h-3 rounded-full" />
              </div>
              <p className="sora-light text-[#060606] lg:text-lg text-base">
                Fill the payment details:
              </p>
            </div>
            {/* form start */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 relative">
                <TextField
                  label="Your Card number (eg.  ---- ---- ---- ----)"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="cardNumber"
                  color="#000000"
                  onChange={handleChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  required
                />
                <Image
                  src={paymentMe}
                  alt="paymentMe"
                  className="absolute right-0 -bottom-2.5 lg:flex hidden"
                />
              </div>

              <div className="flex lg:flex-row flex-col gap-2">
                <TextField
                  label="Card expiry date"
                  variant="standard"
                  className="w-full"
                  name="expiryDate"
                  onChange={handleChange}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate}
                  required
                />
                <div className="w-full relative">
                  <TextField
                    label="Card CVV (eg. ---)"
                    variant="standard"
                    className="w-full outline-[#000000]"
                    name="cvv"
                    onChange={handleChange}
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    required
                  />
                  <Tooltip
                    // placement="top-end"
                    title={`A CVV is a 3- or 4-digit security code printed on payment cards, used to verify that the user has the physical card during transactions.`}
                  >
                    <InfoOutlineSharpIcon className={`absolute right-2 top-[35%] !text-lg !text-[#06060699]`} />
                  </Tooltip>
                </div>
              </div>

              <div className="flex lg:flex-row flex-col gap-2">
                <TextField
                  label="Enter your ZIP Code"
                  variant="standard"
                  className="w-full outline-[#000000]"
                  name="zipCode"
                  onChange={handleChange}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                  required
                />
                <FormControl
                  variant="standard"
                  className="w-full"
                  color="#000000"
                >
                  <InputLabel id="">Select your Country</InputLabel>
                  <Select
                    name="country"
                    value={formData.country}
                    onChange={(e) => {
                      console.log(e, "eval");
                      handleChange(e);
                    }}
                    label="Country"
                    error={!!errors.country}
                    required
                  >
                    <MenuItem value={"IN"}>India</MenuItem>
                    <MenuItem value={"US"}>USA</MenuItem>
                    <MenuItem value={"CA"}>Canada</MenuItem>
                  </Select>
                  {errors.country && (
                    <p className="text-[#d80000] text-[0.8rem]">
                      {errors.country}
                    </p>
                  )}
                </FormControl>
              </div>
              <BookAdemo
                link={`#`}
                onClick={handleSubmit}
                BookaDemo={"Make Payment"}
                icon={<ArrowRight stroke={`#FFDE5A`} />}
                className={`!border-[#FFDE5A] !bg-[#060606] !text-[#FFDE5A] !px-5 !py-2 h-fit w-full`}
              />
              <hr className="border-[#060606CC]" />
              <p className="text-[#060606] text-[16px] sora-regular">
                <span className="sora-semibold">* Note:</span>&nbsp;CVV is 3
                digit security pin, placed on the back of your card.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
