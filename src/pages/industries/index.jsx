import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import IndustriesPage from "../../container/Industries";

const Industries = () => {
  return (
    <>
      <IndustriesPage />
    </>
  );
};

export default Industries;
