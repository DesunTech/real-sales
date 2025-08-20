import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import { useRouter } from "next/router";

function formatSummary(summary) {
  if (!summary) return "";
  return (
    summary
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n\*/g, "<ul><li>")
      .replace(/\n\n/g, "</li><li>")
      .replace(/\n/g, "<br/>")
      .replace(/\nn/g, "<br/>")
      .replace(/\\n/g, "<br/>")
      .replace(/\\nn/g, "<br/>")
      .replace(/<li>/g, '<li style="margin-bottom:12px;">')
      .replace(/<ul><li>/, "<ul><li>") + "</li></ul>"
  );
}

const Index = () => {
  const router = useRouter();

  const { Get, Post } = useApi();
  const { performance_reports } = apis;
  const [pdf, setPdf] = useState();
  const [reportData, setReportData] = useState({});
  const [scoreRows, setScoreRows] = useState([]);
  const [crossSolutionRows, setCrossSolutionRows] = useState([]);
  console.log(reportData, "reportData");
  useEffect(() => {
    if (reportData?.coaching_summary) {
      console.log(reportData, "reportData");
      const newScoreRows = [
        { label: "Overall Score", value: reportData?.overall_score },
        {
          label: "Relationship Building",
          value: reportData?.relationship_building,
        },
        {
          label: "Communication Excellence",
          value: reportData?.communication_excellence,
        },
        { label: "Needs Discovery", value: reportData?.needs_discovery },
        { label: "Solution Matching", value: reportData?.solution_matching },
        {
          label: "Objection Handling & Value Selling",
          value: reportData?.objection_handling_and_value_selling,
        },
        { label: "Negotiation", value: reportData?.negotiation },
        // { label: "Cross Selling", value: reportData?.cross_selling },
        // { label: "Sales Closing", value: reportData?.sales_closing },
      ];
      // if (reportData?.qualifying_lead) {
      //   setScoreRows([
      //     ...newScoreRows,
      //     { label: "Qualifying Lead", value: reportData?.qualifying_lead },
      //   ]);
      // } else {
      //   setScoreRows(newScoreRows);
      // }
      // if (reportData?.cross_selling) {
      //   setScoreRows([
      //     ...newScoreRows,
      //     { label: "Cross Selling", value: reportData?.cross_selling },
      //   ]);
      // } else {
      //   setScoreRows(newScoreRows);
      // }
      // if (reportData?.sales_closing) {
      //   setScoreRows([
      //     ...newScoreRows,
      //     { label: "Sales Closing", value: reportData?.sales_closing },
      //   ]);
      // } else {
      //   setScoreRows(newScoreRows);
      // }
      setScoreRows(newScoreRows);
      //  [
      //   { label: "Overall Score", value: reportData?.overall_score },
      //   { label: "Qualifying Lead", value: reportData?.qualifying_lead },
      //   {
      //     label: "Communication Level",
      //     value: reportData?.communication_level,
      //   },
      //   { label: "Objection Handling", value: reportData?.objection_handling },
      //   { label: "Adaptability", value: reportData?.adaptability },
      //   { label: "Persuasiveness", value: reportData?.persuasiveness },
      //   { label: "Create Interest", value: reportData?.create_interest },
      //   { label: "Sale Closing", value: reportData?.sale_closing },
      //   { label: "Discovery", value: reportData?.discovery },
      // ];

      // const newCrossSolutionRows = [
      //   { label: "Cross Selling", value: reportData?.cross_selling },
      //   { label: "Solution Fit", value: reportData?.solution_fit },
      // ];
      // setCrossSolutionRows(newCrossSolutionRows);
    }
  }, [reportData?.coaching_summary]);

  //   data = [
  //     ['Category', 'Score'],
  //     ['Overall Score', str(report_data.overall_score)],
  //     ['Qualifying Lead', str(report_data.qualifying_lead)],
  //     ['Relationship Building', str(report_data.relationship_building)],
  //     ['Communication Excellence', str(report_data.communication_excellence)],
  //     ['Needs Discovery', str(report_data.needs_discovery)],
  //     ['Solution Matching', str(report_data.solution_matching)],
  //     ['Objection Handling & Value Selling', str(report_data.objection_handling_and_value_selling)],
  //     ['Negotiation', str(report_data.negotiation)],
  //     ['Cross Selling', str(report_data.cross_selling)],
  //     ['Sales Closing', str(report_data.sales_closing)]
  // ]

  useEffect(() => {
    let sessionId = "";
    if (typeof window !== "undefined") {
      sessionId = localStorage.getItem("session_id");
    }

    console.log(sessionId, "sessionId");
    const getReport = async () => {
      if (sessionId) {
        try {
          let createData = await Post(performance_reports, {
            session_id: sessionId,
          });
          if (createData?.coaching_summary) {
            const getReportData1 = await Get(
              `${performance_reports}${sessionId}`
            );
            if (getReportData1?.coaching_summary) {
              setReportData(getReportData1);
            }
            const getPdfData1 = await Get(
              `${performance_reports}${sessionId}/pdf`
            );
            if (getPdfData1) {
              setPdf(getPdfData1);
            }
          } else {
            const getReportData = await Get(
              `${performance_reports}${sessionId}`
            );
            if (getReportData?.coaching_summary) {
              setReportData(getReportData);
              const getPdfData2 = await Get(
                `${performance_reports}${sessionId}/pdf`
              );
              if (getPdfData2) {
                setPdf(getPdfData2);
              }
            }
          }
        } catch (error) {
          console.log(error, "error");
        }
      }
    };
    getReport();
  }, []);

  const downLoadPdf = () => {
    if (pdf) {
      try {
        const pdfBlob =
          pdf instanceof Blob
            ? pdf
            : new Blob([pdf], { type: "application/pdf" });
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sales_report.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    } else {
      console.log("No PDF data available to download.");
    }
  };

  return (
    <div className="bg-[url(../../public/assets/images/RealSales-backgrounds/bg-2.png)] bg-cover bg-center bg-no-repeat min-h-screen py-5">
      <div className="page-container mx-auto container px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#425756]">
            Session Report
          </h1>
          <div className="flex justify-end gap-2 mb-4">
            <Button
              className={`rounded-[8px] shadow-[0px_4px_4px_0px_#00000040] !text-white !bg-[#425756] uppercase !py3 !px-3 !text-[16px]`}
              onClick={() => downLoadPdf()}
              disabled={pdf ? false : true}
            >
              DOWNLOAD&nbsp;REPORT&nbsp;
              {pdf ? null : <CachedIcon className="animate-spin" />}
            </Button>
            <Button
              className={`rounded-[8px] shadow-[0px_4px_4px_0px_#00000040] !text-white !bg-[#006ccc] uppercase !py3 !px-3 !text-[16px]`}
              onClick={() => router.push("/feedback")}
              // disabled={pdf ? false : true}
            >
              Next
            </Button>
          </div>
          <table className="w-full mb-6 border border-gray-300 bg-opacity-80">
            <thead>
              <tr className="bg-gray-200 bg-opacity-90">
                <th className="text-left px-4 py-2 font-bold">Category</th>
                <th className="text-left px-4 py-2 font-bold">Score</th>
              </tr>
            </thead>
            <tbody>
              {scoreRows.map((row) => (
                <tr key={row?.label} className="border-t border-gray-200">
                  <td className="px-4 py-2">{row?.label}</td>
                  <td className="px-4 py-2">{row?.value}</td>
                </tr>
              ))}
              {reportData?.qualifying_lead !== undefined && reportData?.qualifying_lead !== null ? (
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2">Qualifying Lead</td>
                  <td className="px-4 py-2">{reportData?.qualifying_lead}</td>
                </tr>
              ) : null}

              {reportData?.cross_selling !== undefined && reportData?.cross_selling !== null ? (
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2">Cross Selling</td>
                  <td className="px-4 py-2">{reportData?.cross_selling}</td>
                </tr>
              ) : null}

              {reportData?.sales_closing !== undefined && reportData?.sales_closing !== null ? (
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-2">Sales Closing</td>
                  <td className="px-4 py-2">{reportData?.sales_closing}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <table className="w-1/3 mb-6 border border-gray-300 bg-opacity-80">
            <tbody>
              {crossSolutionRows?.map((row) => (
                <tr key={row.label} className="border-t border-gray-200">
                  <td className="px-4 py-2">{row?.label}</td>
                  <td className="px-4 py-2">{row?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Coaching Summary</h2>
            <div
              className="text-gray-800"
              dangerouslySetInnerHTML={{
                __html: formatSummary(reportData.coaching_summary),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
