import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { useApi } from "../../hooks/useApi";
import { apis } from "../../utils/apis";
import { useRouter } from "next/router";

// const reportData = {
//   discovery: 70,
//   adaptability: 60,
//   sale_closing: 40,
//   solution_fit: 75,
//   cross_selling: 0,
//   overall_score: 65,
//   persuasiveness: 70,
//   create_interest: 85,
//   coaching_summary:
//     "The sales representative demonstrates good initial engagement and communication, effectively creating interest in the product. The rep acknowledges the customer's concerns and provides some incentives like discounts and free shipping. However, objection handling is weak, particularly regarding implementation, tariff concerns, and contract details. The rep attempts to close prematurely without fully addressing the customer's questions about warranty, contract flexibility, and tariff protection. There's no evidence of cross-selling. \n\n**Specific Feedback:**\n\n*   **Objection Handling:** The rep needs to directly address the customer's concerns about implementation, downtime, training, and tariff implications with specific details and evidence. Instead of just offering discounts, provide concrete solutions and assurances. For example, quantify the expected downtime, detail the training program, and explain the tariff mitigation strategies.\n\n*   **Value Reinforcement:** While the rep mentions benefits like fast turns and promo support, they need to connect these benefits more explicitly to the customer's operational challenges and KPIs. Quantify the potential ROI and payback period. Differentiate the product from alternatives by highlighting unique features and benefits.\n\n*   **Risk Mitigation:** The rep should provide more credible assurances about implementation and disruption. Outline specific support and contingency plans. Address warranty and performance guarantee concerns. Provide realistic timelines and resource requirements. Offer references or evidence of successful similar implementations.\n\n*   **Negotiation Skill:** The rep needs to be more flexible and creative in finding win-win solutions to contractual concerns. Instead of just offering discounts, explore other options like extended payment terms or shared risk agreements. Maintain a value focus rather than just price focus.\n\n*   **Commitment Securing:** The rep attempts to close prematurely without fully addressing the customer's concerns. They need to recognize buying signals and advance appropriately. Propose clear, specific next steps that address the customer's remaining concerns. Avoid high-pressure tactics and focus on building trust and confidence.\n\n*   **Tariff Knowledge & Mitigation Assessment:** The rep needs to demonstrate a better understanding of tariff impacts on F&B equipment and parts. They should present credible strategies for mitigating tariff-related risks and offer appropriate contractual protections against future tariff increases. Show awareness of domestic vs. international sourcing implications and provide relevant examples of how other customers have managed tariff issues.",
//   engagement_level: 75,
//   objection_handling: 50,
//   communication_level: 80,
// };

function formatSummary(summary) {
  if (!summary) return "";
  return (
    summary
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n\*/g, "<ul><li>")
      .replace(/\n\n/g, "</li><li>")
      .replace(/\n/g, "<br/>")
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

  useEffect(() => {
    if (reportData?.coaching_summary) {
      console.log(reportData, "reportData");
      const newScoreRows = [
        { label: "Overall Score", value: reportData?.overall_score },
        { label: "Engagement Level", value: reportData?.engagement_level },
        {
          label: "Communication Level",
          value: reportData?.communication_level,
        },
        { label: "Objection Handling", value: reportData?.objection_handling },
        { label: "Adaptability", value: reportData?.adaptability },
        { label: "Persuasiveness", value: reportData?.persuasiveness },
        { label: "Create Interest", value: reportData?.create_interest },
        { label: "Sale Closing", value: reportData?.sale_closing },
        { label: "Discovery", value: reportData?.discovery },
      ];
      setScoreRows(newScoreRows);

      const newCrossSolutionRows = [
        { label: "Cross Selling", value: reportData?.cross_selling },
        { label: "Solution Fit", value: reportData?.solution_fit },
      ];
      setCrossSolutionRows(newCrossSolutionRows);
    }
  }, [reportData?.coaching_summary]);

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
            setReportData(getPdfData1);
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
                <tr key={row.label} className="border-t border-gray-200">
                  <td className="px-4 py-2">{row.label}</td>
                  <td className="px-4 py-2">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-1/3 mb-6 border border-gray-300 bg-opacity-80">
            <tbody>
              {crossSolutionRows.map((row) => (
                <tr key={row.label} className="border-t border-gray-200">
                  <td className="px-4 py-2">{row.label}</td>
                  <td className="px-4 py-2">{row.value}</td>
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
          <div className="flex justify-end gap-2 mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default Index;
