import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";

const IndustriesPage = () => {
  const { Get } = useApi();
  const { industries } = apis;

  let capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const [industryData, setIndustryData] = useState([]);

  function formatSummary(summary) {
    if (!summary) return "";
    return (
      summary
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\\n/g, " <span>")
        .replace(/'/g, "")
        .replace(/\n\n\*/g, "<ul><li>")
        .replace(/\n\n/g, "</li><li>")
        .replace(/\n/g, "<br/>")
        .replace(/<li>/g, '<li style="margin-bottom:12px;">')
        .replace(/<ul><li>/, "<ul><li>") + "</li></ul>"
    );
  }

  useEffect(() => {
    const getIndustries = async () => {
      try {
        let data = await Get(industries);
        if (data?.length) {
          setIndustryData(data);
        }
      } catch (error) {}
    };

    getIndustries();
  }, []);
  console.log(industryData, "__data___");

  return (
    <div className="page-container mx-auto px-4 py-8 container flex flex-col items-center justify-between gap-8">
      <h1 className="lg:text-5xl text-2xl text-[#060606E5] m-plus-rounded-1c-medium uppercase text-center w-full">
        Industries
      </h1>

      <div className="w-full flex flex-col items-start gap-16">
        {industryData?.length ? (
          industryData.map((v, i) => (
            <div key={i} className="flex flex-col items-start gap-4">
              <h2 className="lg:text-3xl text-xl m-plus-rounded-1c-medium capitalize">
                {v?.name?.replace(/_/g, " ")}
              </h2>
              <p
                className="m-plus-rounded-1c-regular text-base leading-8"
                dangerouslySetInnerHTML={{
                  __html: formatSummary(`${v?.details}.`),
                }}
              />
            </div>
          ))
        ) : (
          <div className="w-full p-8 flex items-center justify-center text-2xl">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default IndustriesPage;
