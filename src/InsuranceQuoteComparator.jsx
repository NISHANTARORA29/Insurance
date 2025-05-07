import React, { useState } from 'react';

const InsuranceExtractor = () => {
  // State for extracted data from documents
  const [extractedData, setExtractedData] = useState(null);
  // State for the template data
  const [templateData, setTemplateData] = useState({
    jobDescription: 'User Defined',
    clientName: 'User Defined',
    policyType: 'User Defined',
    contractPeriod: 36,
    extMaintCover: 12,
    contractValue: 'User Defined',
    totalSumInsured: 'User Defined',
  });
  // State for loading status
  const [isLoading, setIsLoading] = useState(false);
  // State for bearer token
  const [bearerToken, setBearerToken] = useState("");
  // State for agent API URL
  const [agentApiUrl, setAgentApiUrl] = useState("http://localhost:5002");
  // State for selected insurer
  const [selectedInsurer, setSelectedInsurer] = useState("ICICI");
  // State for document name
  const [documentName, setDocumentName] = useState("Terms-LE23M976_-ICICI.pdf");

  // List of supported insurers
  const supportedInsurers = ["ICICI", "HDFC", "TATA"];

  // Standard coverages and add-ons from your template
  const standardCoverages = [
    'Basic Premium', 'Earthquake - II', 'STFI', 'Terrorism', 'Marine',
    'Total Premium excl GST', 'GST @ 18%', 'Total Premium incl GST'
  ];

  const addOnCovers = [
    'Escalation', 'Earthquake', 'Waiver of Subrogation', 'Design Defect - DE3',
    'Owners Surrounding property with Flexa', 'Cover for offsite storage, fabrication',
    'Plans & Documents', 'Put to Use', 'Breakage of glass', 'Multiple Insured Clause',
    '50/50 Clause', '72 hours clause', 'Free Auto. Reinstatement upto 10%',
    'Professional Fees', 'Waiver of contribution clause', 'Additional custom duty - upto 10 Cr',
    'Air freight & exp freight upto 30% claim', 'Loss Minimisation Expense',
    'TPL with Cross Liability', 'Debris Removal (Incl Foreign)', 'Cessation of Works',
    'Claim Preparation Costs', 'Temporary Repair Clause', 'Improvement cost actual of insured property'
  ];

  // Function to handle bearer token input
  const handleTokenChange = (e) => {
    setBearerToken(e.target.value);
  };

  // Function to handle agent API URL input
  const handleApiUrlChange = (e) => {
    setAgentApiUrl(e.target.value);
  };
  
  // Function to handle insurer selection
  const handleInsurerChange = (e) => {
    setSelectedInsurer(e.target.value);
    
    // Update default document name based on selected insurer
    if (e.target.value === "ICICI") {
      setDocumentName("Terms-LE23M976_-ICICI.pdf");
    } else if (e.target.value === "HDFC") {
      setDocumentName("HDFC-policy-document.pdf");
    } else if (e.target.value === "TATA") {
      setDocumentName("TATA-policy-document.pdf");
    }
  };
  
  // Function to handle document name input
  const handleDocumentNameChange = (e) => {
    setDocumentName(e.target.value);
  };

  // Function to extract data using the AI agent
  const extractData = async () => {
    if (!bearerToken) {
      alert("Please enter a bearer token for authentication");
      return;
    }
    
    if (!documentName) {
      alert("Please enter a document name");
      return;
    }
    
    setIsLoading(true);
  
    try {
      // Call the insurance agent API
      const agentResponse = await fetch(`${agentApiUrl}/extract-insurance-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: bearerToken,
          insurer: selectedInsurer,
          space_name: "Insurance_usecase",
          flow_name: "Quote-Comp",
          document_name: documentName
        })
      });
      
      if (!agentResponse.ok) {
        throw new Error(`Error from agent API: ${agentResponse.statusText}`);
      }
      
      const responseData = await agentResponse.json();
      
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      
      // Update state with extracted data
      setExtractedData(responseData.data);
      
    } catch (error) {
      console.error('Error extracting data:', error);
      alert(`Error extracting data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle template data changes
  const handleTemplateChange = (e) => {
    const { name, value } = e.target;
    setTemplateData({
      ...templateData,
      [name]: value
    });
  };

  // Function to export to Excel (this would be simplified - in real app you'd use a library)
  const exportToExcel = () => {
    alert('Export functionality would be implemented here with a proper Excel library');
    // In a real app, you would use a library like xlsx or exceljs
  };

  return (
    <div className="insurance-extractor">
      <style>
        {`
          .insurance-extractor {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          
          h1, h2, h3 {
            color: #2c3e50;
          }
          
          .section {
            margin-bottom: 30px;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          
          .form-group {
            margin-bottom: 15px;
          }
          
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          
          input, select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          
          button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            font-size: 16px;
          }
          
          button:hover {
            background-color: #2980b9;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          
          th {
            background-color: #f2f2f2;
            position: sticky;
            top: 0;
          }
          
          .table-container {
            max-height: 600px;
            overflow-y: auto;
            margin-top: 20px;
          }
          
          .loader {
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 2s linear infinite;
            margin: 20px auto;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .first-col {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          
          .highlight {
            background-color: #e6f7ff;
          }
          
          .section-header {
            background-color: #2c3e50;
            color: white;
            padding: 10px;
            font-weight: bold;
            text-align: center;
          }
        `}
      </style>
      
      <h1>Insurance Data Extraction Tool (AI Agent Powered)</h1>
      
      <div className="section">
        <h2>Authentication & Configuration</h2>
        <div className="form-group">
          <label>Bearer Token:</label>
          <input 
            type="password" 
            value={bearerToken}
            onChange={handleTokenChange}
            placeholder="Enter your API bearer token"
          />
        </div>
        <div className="form-group">
          <label>API URL:</label>
          <input 
            type="text" 
            value={agentApiUrl}
            onChange={handleApiUrlChange}
            placeholder="Enter the agent API URL"
          />
        </div>
        <div className="form-group">
          <label>Select Insurer:</label>
          <select value={selectedInsurer} onChange={handleInsurerChange}>
            {supportedInsurers.map((insurer) => (
              <option key={insurer} value={insurer}>{insurer}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Document Name:</label>
          <input 
            type="text" 
            value={documentName}
            onChange={handleDocumentNameChange}
            placeholder="Enter document name (e.g., policy.pdf)"
          />
        </div>
      </div>
      
      <div className="section">
        <h2>Template Configuration</h2>
        <div className="form-group">
          <label>Job Description:</label>
          <input 
            type="text" 
            name="jobDescription"
            value={templateData.jobDescription}
            onChange={handleTemplateChange}
          />
        </div>
        <div className="form-group">
          <label>Client Name:</label>
          <input 
            type="text" 
            name="clientName"
            value={templateData.clientName}
            onChange={handleTemplateChange}
          />
        </div>
        <div className="form-group">
          <label>Policy Type:</label>
          <input 
            type="text" 
            name="policyType"
            value={templateData.policyType}
            onChange={handleTemplateChange}
          />
        </div>
        <div className="form-group">
          <label>Contract Period (months):</label>
          <input 
            type="number" 
            name="contractPeriod"
            value={templateData.contractPeriod}
            onChange={handleTemplateChange}
          />
        </div>
        <div className="form-group">
          <label>Extended Maintenance Cover (months):</label>
          <input 
            type="number" 
            name="extMaintCover"
            value={templateData.extMaintCover}
            onChange={handleTemplateChange}
          />
        </div>
        <div className="form-group">
          <label>Contract Value:</label>
          <input 
            type="text" 
            name="contractValue"
            value={templateData.contractValue}
            onChange={handleTemplateChange}
          />
        </div>
        <div className="form-group">
          <label>Total Sum Insured:</label>
          <input 
            type="text" 
            name="totalSumInsured"
            value={templateData.totalSumInsured}
            onChange={handleTemplateChange}
          />
        </div>
      </div>
      
      <div className="section">
        <h2>Actions</h2>
        <button onClick={extractData} disabled={isLoading}>
          {isLoading ? 'Extracting...' : 'Extract Data from Document'}
        </button>
        <button onClick={exportToExcel} disabled={!extractedData || isLoading}>
          Export to Excel
        </button>
      </div>
      
      {isLoading && (
        <div className="loader"></div>
      )}
      
      {extractedData && (
        <div className="section">
          <h2>Extracted Insurance Data</h2>
          
          <h3>Basic Policy Information</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(extractedData.basicInfo || {}).map(([key, value]) => (
                  <tr key={key}>
                    <td className="first-col">{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <h3>Excess/Deductible Information</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(extractedData.excess || {}).map(([key, value]) => (
                  <tr key={key}>
                    <td className="first-col">{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <h3>Standard Coverages</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Coverage</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {standardCoverages.map((coverage) => (
                  <tr key={coverage} className={extractedData.coverages?.[coverage] !== 'Not Found' ? 'highlight' : ''}>
                    <td className="first-col">{coverage}</td>
                    <td>{extractedData.coverages?.[coverage] || 'Not Found'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <h3>Add-on Covers</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Add-on</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {addOnCovers.map((addon) => (
                  <tr key={addon} className={extractedData.addOns?.[addon] !== 'Not Found' ? 'highlight' : ''}>
                    <td className="first-col">{addon}</td>
                    <td>{extractedData.addOns?.[addon] || 'Not Found'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceExtractor;