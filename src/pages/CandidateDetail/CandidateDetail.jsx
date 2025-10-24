import "./CandidateDetail.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import Header from "../../components/Header/Header";
import CandidateHero from "../../components/CandidateHero/CandidateHero";
import CandidateOverview from "../../components/CandidateOverview/CandidateOverview";
import AccordionList from "../../components/AccordionList/AccordionList";
import { HeaderContext } from "../../global-components/HeaderContext";

function CandidateDetail() {
  const [candidateAssessments, setCandidateAssessments] = useState([]);
  const [assessmentSelected, setAssessmentSelected] = useState();
  const [openAccordions, setOpenAccordions] = useState(false);
  const {headerData, getHeaderData} = useContext(HeaderContext)
  const headers = {
    "Content-Type": "application/json",
  };

  const { id } = useParams();

  const getCandidateDetail = async () => {
    try {
      const response = await axios.get(`https://api.quotient-ai.com/api/candidates/${id}`, { headers, withCredentials: true });
      console.log(response.data);
      if (response.data.length > 1) {
        setCandidateAssessments(response.data);
      } else {
        setAssessmentSelected(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectCandidateAssessment = (event) => {
    const assessment = candidateAssessments.filter((item) => item.candidate.candidate_assessment_id === parseInt(event.currentTarget.id));
    setAssessmentSelected(assessment[0]);
    console.log(event.currentTarget.id);
  };

  const calculateTscore = async () => {
    try {
      const response = await axios.post(
        `https://api.quotient-ai.com/api/attributes`,
        {
          candidate_id: id,
          assessment_id: assessmentSelected.candidate.assessment_id,
          candidate_assessment_id: assessmentSelected.candidate.candidate_assessment_id,
          norm_group_id: assessmentSelected.candidate.norm_group_id,
          is_norm: assessmentSelected.candidate.is_norm,
        },
        { headers, withCredentials: true }
      );
      console.log(response.data);
      getCandidateDetail();
    } catch (error) {
      console.log(error);
    }
  };

  const contentRef = useRef();

  const handleDownloadPDF = () => {
    setOpenAccordions(true);
  };

  const generatePDF = async () => {
    const element = contentRef.current;

    // 1️⃣ Capture element as canvas
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // 2️⃣ Create a PDF instance
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // 3️⃣ Calculate image dimensions in PDF units
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // 4️⃣ Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // 5️⃣ Add extra pages if content overflows
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // 6️⃣ Save the PDF
    pdf.save("page.pdf");
    setOpenAccordions(false);
  };

  useEffect(() => {
    if (openAccordions) {
      generatePDF();
    }
  }, [openAccordions]);

  useEffect(() => {
    getCandidateDetail();
    getHeaderData(1);
  }, []);

  return (
    <>
      <Header role={1} 
      companyName={headerData.company_name} 
      name={headerData.recruiter_name}
      />
      {assessmentSelected ? (
        <>
          <div ref={contentRef}>
            <CandidateHero downloadReport={handleDownloadPDF} candidate={assessmentSelected.candidate} />
            <CandidateOverview />
            <AccordionList openAccordions={openAccordions} assessmentId={assessmentSelected.candidate.assessment_id} attributes={assessmentSelected.attributes} />

            <div className="container-standar">
              <div className="group-detail">
                <h1>Scores</h1>
                {assessmentSelected.attributes
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <li key={item.name}>
                      <strong>{item.name}:</strong> {item.t_score}
                    </li>
                  ))}
              </div>
            </div>
          </div>
          <div className="button-container">
            <button className="secondary-button" onClick={calculateTscore}>
              Re-calculate TScore
            </button>
          </div>
        </>
      ) : (
        <div className="assessments-container">
          <div className="card">
            <h1>Select the assessment you would like to review for this candidate</h1>
            {candidateAssessments
              .sort((a, b) => a.candidate.assessment_name.localeCompare(b.candidate.assessment_name))
              .map((item) => (
                <div onClick={selectCandidateAssessment} className="candidate-assessment-option" id={item.candidate.candidate_assessment_id} key={item.candidate.candidate_assessment_id}>
                  <span className="name">{item.candidate.assessment_name}</span>
                  <span className={`${item.candidate.status} status`}>{item.candidate.status || "Sent"}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CandidateDetail;
