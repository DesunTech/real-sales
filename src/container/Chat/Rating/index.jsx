import { FormControlLabel, Radio, Rating, Slider, styled } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import selJoye from "../../../../public/assets/icons/selJoye.svg";
import CustomThumb from "../../../../public/assets/icons/CustomThumb.svg";

const RatingContainer = () => {
  const [rating, setRating] = useState(3.5);

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

  return (
    <div className="w-full flex items-center justify-center gap-8 px-[8%]">
      <div className="w-[70%]">
        <div className="flex flex-col items-start">
          <h1 className="m-plus-rounded-1c-semilight text-[#FFFFFF] text-[50px] text-center">
            Thank you for your&nbsp;
            <span className="m-plus-rounded-1c-regular text-[#FFDE5A]">
              Time&nbsp;!
            </span>
          </h1>
          <p className="text-center text-white lg:text-[15px] text-[13px] sora-regular w-[75%]">
            Your Feedback helps up to improve our efforts. Our efforts is the
            result for your Experiences.
          </p>
        </div>
        <FormControlLabel
          value="end"
          control={
            <Radio
              size="small"
              checked={true}
              sx={{
                cursor: "default",
                color: "#FFDE5A",
                "&.Mui-checked": {
                  color: "#FFDE5A", // checked color
                },
              }}
            />
          }
          label={
            <div className="sora-regular text-lg flex items-center gap-1">
              Rate your Experience!&nbsp;
              <Image src={selJoye} alt="selJoye" className="w-5 h-5" />
            </div>
          }
          sx={{
            cursor: "default",
            color: "#FFFFFF", // label text color
          }}
        />
        <p className="lg:text-[15px] text-[14px] text-white text-start m-plus-rounded-1c-regular lg:w-[90%] w-full">
          Lorem Ipsum is simply dummy text of the printing there are many
          variations of passages of Lorem Ipsum available, but the majority have
          suffered alteration.
        </p>
        <div className="flex flex-col items-center">
          <Rating
            size="large"
            name="half-rating"
            onChange={(e, newValue) => handleRatingChange(newValue)}
            value={rating}
            precision={0.5}
            sx={{gap: 2}}
          />
          <Slider
            value={rating}
            onChange={(e, newValue) => handleRatingChange(newValue)}
            valueLabelDisplay="auto"
            step={0.5}
            aria-label="custom thumb label"
            max={5}
            min={1}
            sx={{
              width: "25rem",
              height: 8,
              color: "#63E5FFB2", // Custom color for the slider
            }}
          />
        </div>
      </div>
      <div className="w-[30%]">sss</div>
    </div>
  );
};

export default RatingContainer;
