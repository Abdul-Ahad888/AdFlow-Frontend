import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

export default function CreativeBriefBuilder() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    clientName: "",
    industry: "",
    website: "",
    competitors: "",
    objective: "",
    audience: "",
    budget: "",
    tone: "",
    imagery: "",
    colors: "",
    dos: "",
    donts: "",
  });

  const [aiBrief, setAiBrief] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const generateAIBrief = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://ad-flow-backend.vercel.app/api/generate-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Generation failed");
      }

      setAiBrief(data);
      setStep(4);
    } catch (err) {
      console.error("Frontend Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setError("");
    if (step === 3) {
      const mandatoryFilled =
        formData.clientName &&
        formData.industry &&
        formData.objective &&
        formData.audience &&
        formData.budget;

      if (!mandatoryFilled) {
        setError("Please fill all mandatory fields (*) before proceeding!");
        return;
      }
      await generateAIBrief();
    } else {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };

  const handleBack = () => {
    if (loading) return;
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.clientName && formData.industry;
    }
    if (step === 2) {
      return formData.objective && formData.audience && formData.budget;
    }
    return true;
  };

  const stepLabels = ["Client Info", "Objective", "Creative Preferences", "Review & Submit"];

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    let y = 20;

    const printWrappedText = (text, fontSize = 12, isBold = false, spacing = 7) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text || "-", maxLineWidth);
      lines.forEach((line) => {
        if (y > 280) { doc.addPage(); y = 20; }
        doc.text(line, margin, y);
        y += spacing;
      });
    };

    printWrappedText("Creative Brief", 18, true, 12);
    y += 5;
    printWrappedText("User Inputs:", 14, true, 10);
    Object.entries(formData).forEach(([key, value]) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      printWrappedText(`${label}: ${value || "-"}`, 11, false, 7);
    });

    y += 10;
    doc.setDrawColor(200);
    doc.line(margin, y - 5, pageWidth - margin, y - 5);
    printWrappedText("AI Suggestions:", 14, true, 10);
    printWrappedText(`Campaign Title: ${aiBrief?.campaignTitle}`, 12, true, 8);
    printWrappedText("Headlines:", 12, true, 8);
    aiBrief?.headlines?.forEach((h) => printWrappedText(`• ${h}`, 11, false, 7));
    y += 3;
    printWrappedText("Tone Guide:", 12, true, 8);
    printWrappedText(aiBrief?.toneGuide, 11, false, 7);
    y += 3;
    printWrappedText("Recommended Channels:", 12, true, 8);
    aiBrief?.channels?.forEach((c) => printWrappedText(`• ${c.name}: ${c.budget}`, 11, false, 7));
    y += 3;
    printWrappedText("Key Visual Direction:", 12, true, 8);
    printWrappedText(aiBrief?.heroVisual, 11, false, 7);
    doc.save(`${formData.clientName || "creative"}-brief.pdf`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Link to={"/dashboard"}>
        <i className="fixed top-4 h-10 w-10 left-4 z-50 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors cursor-pointer">
          <ChevronLeft size={20} className="text-gray-700" />
        </i>
      </Link>

      {/* Left Column */}
      <div className="lg:w-1/2 bg-gradient-to-b from-indigo-700 to-blue-900 text-white p-12 flex flex-col justify-center">
        <h1 className="text-5xl font-bold mb-4">AI Creative Brief Builder</h1>
        <p className="text-lg mb-6 opacity-90">
          Quickly create professional, structured campaign briefs with AI assistance.
        </p>
        <ul className="space-y-3">
          {[
            "Step-by-step guided form",
            "AI-generated campaign insights",
            "Export your brief as a PDF",
            "Save time and standardize your creative process",
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column */}
      <div className="lg:w-1/2 bg-white h-screen overflow-y-auto p-12 flex flex-col relative">
        {/* Step Indicator */}
        <div className="flex justify-between mb-12 flex-shrink-0">
          {stepLabels.map((label, idx) => {
            const active = step === idx + 1;
            const completed = step > idx + 1;
            return (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 md:w-20 md:h-20 flex items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${active ? "bg-blue-600 border-blue-600 text-white scale-110 shadow-md" :
                    completed ? "bg-green-500 border-green-500 text-white" : "border-gray-200 text-gray-400"
                  }`}>
                  {completed ? "✓" : idx + 1}
                </div>
                <span className={`mt-3 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-center ${active ? "text-blue-600" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <div className="w-full max-w-xs text-center">
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-2 bg-blue-600 rounded-full"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <p className="text-gray-600 font-medium animate-pulse">Crafting your creative strategy...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
              <button onClick={() => setError("")} className="mt-4 text-blue-600 text-sm font-medium hover:underline">Go back and try again</button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  <input name="clientName" placeholder="Client Name *" value={formData.clientName} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <input name="industry" placeholder="Industry *" value={formData.industry} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <input name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <input name="competitors" placeholder="Key Competitors" value={formData.competitors} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  <select name="objective" value={formData.objective} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white">
                    <option value="">Select Objective *</option>
                    <option value="awareness">Awareness</option>
                    <option value="consideration">Consideration</option>
                    <option value="conversion">Conversion</option>
                  </select>
                  <input name="audience" placeholder="Target Audience *" value={formData.audience} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <input name="budget" placeholder="Budget *" value={formData.budget} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                  <input name="tone" placeholder="Tone of Voice" value={formData.tone} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <input name="imagery" placeholder="Imagery Style" value={formData.imagery} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <input name="colors" placeholder="Color Direction" value={formData.colors} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <input name="dos" placeholder="Do's" value={formData.dos} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <input name="donts" placeholder="Don'ts" value={formData.donts} onChange={handleChange} className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </motion.div>
              )}

              {step === 4 && aiBrief && (
                <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-gray-100 shadow-sm p-8 rounded-2xl space-y-8 mb-10">
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-4 border-b pb-2">Campaign Brief Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-gray-700 font-medium">{value || "-"}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <h3 className="font-bold text-lg text-blue-600">AI Campaign Suggestions</h3>
                    <p className="text-gray-700"><span className="font-bold">Title:</span> {aiBrief.campaignTitle}</p>
                    <div>
                      <span className="font-bold text-gray-700">Headlines:</span>
                      <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-1">
                        {aiBrief.headlines.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </div>
                    <p className="text-gray-600"><span className="font-bold text-gray-700">Tone:</span> {aiBrief.toneGuide}</p>
                    <button onClick={downloadPDF} className="w-full mt-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
                      Download PDF Brief
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={handleBack}
            disabled={step === 1 || loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${step === 1 || loading ? "opacity-0 pointer-events-none" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            <ChevronLeft size={20} /> Previous
          </button>

          {step < totalSteps && (
            <button
              onClick={handleNext}
              disabled={loading || !isStepValid()}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${
                !isStepValid()
                  ? "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none"
                  : step === 3
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              {loading ? "Generating..." : (
                <>
                  {step === 3 ? "Generate Brief" : "Next"}
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Progress Bar - Only on first 3 steps */}
        {step < totalSteps && (
          <div className="h-1.5 bg-gray-100 rounded-full mt-8 overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}