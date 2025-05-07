import React, { useState, useEffect } from 'react';

const InsuranceQuoteComparator = () => {
  // State for uploaded document data
  const [documents, setDocuments] = useState([]);
  // State for extracted data from documents
  const [extractedData, setExtractedData] = useState([]);
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
  const bearerToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyNzJza204SEFYVEl1MWgwNThyZUliVVJILWhLTEE5OElFOHdqMDlyXzJNIn0.eyJleHAiOjE3NDEwNzM1ODMsImlhdCI6MTc0MTA3MjA4MywiYXV0aF90aW1lIjoxNzQxMDY5MTkyLCJqdGkiOiI2NzEyYjFhNy1mMzBmLTQyMmQtOTFhNS1hY2VjMzFjMWE4MzYiLCJpc3MiOiJodHRwczovL2xudGNzLmFpL2tleWNsb2FrL3JlYWxtcy9jYW52YXNhaSIsImF1ZCI6ImJyb2tlciIsInN1YiI6ImQwNTkxZDg4LWUyYTEtNGE1OC1hODYxLWNiMTRjZTQ3NjJiZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNhbnZhc2FpLWNvbnRyb2xwbGFuZS11aSIsIm5vbmNlIjoiODNhZDZiNWYtNDY4NC00NTA2LThhNGQtZmU2MmJjNjI5ZjYxIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMjBmN2FjLWUyOTgtNDg4Ni1iMjZhLWVjNmE5NWNmNjE3ZCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiIsImh0dHBzOi8vbG50Y3MuYWkvc3R1ZGlvIl0sInJlc291cmNlX2FjY2VzcyI6eyJicm9rZXIiOnsicm9sZXMiOlsicmVhZC10b2tlbiJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIEdyb3VwU2NvcGUgcHJvZmlsZSIsInNpZCI6IjhhMjBmN2FjLWUyOTgtNDg4Ni1iMjZhLWVjNmE5NWNmNjE3ZCIsInVwbiI6ImVmZDI4MWFhLTUyM2EtNDhjNS1iZjY3LWE5ZmQzYTQ4ZmZiYiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQW5hcyBTYWhlYiIsImdyb3VwcyI6WyIvY2FudmFzYWktYWRtaW4iLCIvY2FudmFzYWktY3JlYXRvciJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJlZmQyODFhYS01MjNhLTQ4YzUtYmY2Ny1hOWZkM2E0OGZmYmIiLCJnaXZlbl9uYW1lIjoiQW5hcyIsImZhbWlseV9uYW1lIjoiU2FoZWIiLCJlbWFpbCI6ImFuYXMuc2FoZWItY250QGxudGVjYy5jb20ifQ.OgbldflbcGQdrUC-cYw3sRUQDxpvSY4oLtRhOwguC5PlCHgF04Kw7u6WMD0fVGdfqT2IVdbdhmffhptsp7F9WsxXwB2Ryiygwyg4kEwEuwyFcMvI4r1ByQWCCxCiVmTeGYtWzdmmfabti8Q0NppOkya2Z6WP_BLLypj3tKdJRCuLjWsSsk1lhnKSM_FXBu0t-lxw8a5_XBzFrjmLezFbu2vK7QMomMH2jUCCNHGY9Cd7wSCwUMEjojXmQWZcksInD8CiZJmz6jD9-_71TtxloVwDaQKUmcYv1O-fjTQPns-RcSkSquUAucZlvpjkFP-fVGT3tnEcdenBaE5VVF-C5Q";

  // Standard coverages and add-ons from your template
  const standardCoverages = [
    'Basic Premium', 'Earthquake - II', 'STFI', 'Terrorism', 'Marine',
    'Total Premium excl GST', 'GST @ 18%', 'Total Premium excl GST'
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

  // Insurers from your template
  const insurers = ['ICICI', 'User Defined', 'User Defined', 'User Defined', 'User Defined', 'Bajaj/Tata'];

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);
  };

  // Function to extract data from documents
  const extractData = async () => {
    if (documents.length === 0) {
      alert('Please upload at least one document');
      return;
    }

    

    setIsLoading(true);

    try {
      // Array to store extracted data from each document
      const allExtractedData = [];

      // Process each document
      for (const document of documents) {
        // Create form data to send the file
        const formData = new FormData();
        formData.append('file', document);

        // First upload the document to get a reference
        const uploadResponse = await fetch('https://lntcs.ai/documentservice/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
          body: formData
        });

        if (!uploadResponse.ok) {
          throw new Error(`Error uploading document: ${uploadResponse.statusText}`);
        }

        const uploadData = await uploadResponse.json();
        const documentId = uploadData.document_id;

        // Now query the document for insurance data
        const extractionResponse = await fetch('https://lntcs.ai/chatservice/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`,
            'accept': 'application/json'
          },
          body: JSON.stringify({
            query: "Extract all insurance coverages, add-on covers, premiums, and policy details for quote comparison",
            space_name: "Insurance_usecase",
            userId: "anonymous",
            hint: "Act as an expert in insurance analyzing policy documents. Extract all information related to: policy type, contract period, sum insured, premiums for different coverages (Basic, Earthquake, STFI, Terrorism, Marine), GST details, and all add-on covers with their values. Format the output as structured data that can be used for comparison.",
            flow_name: "Quote-Comp",
            embedding_metadata: {
              "file_name": Terms-LE23M976_-ICICI.pdf
            }
          })
        });

        if (!extractionResponse.ok) {
          throw new Error(`Error extracting data: ${extractionResponse.statusText}`);
        }

        const extractionData = await extractionResponse.json();
        
        // Process the extracted data to fit our template
        const processedData = {
          insurer: document.name.split('.')[0], // Use filename as insurer name
          coverages: {},
          addOns: {}
        };

        // Parse the text response to extract structured data
        // This is a simplified version - in a real app you'd need more robust parsing
        const responseText = extractionData.response;
        
        // Extract basic premium information
        standardCoverages.forEach(coverage => {
          const regex = new RegExp(`${coverage}[\\s\\:]+([\\d\\,\\.]+)`, 'i');
          const match = responseText.match(regex);
          processedData.coverages[coverage] = match ? match[1] : 'Not Specified';
        });

        // Extract add-on covers information
        addOnCovers.forEach(addOn => {
          const regex = new RegExp(`${addOn}[\\s\\:]+([\\w\\d\\s\\,\\.\\%]+)`, 'i');
          const match = responseText.match(regex);
          processedData.addOns[addOn] = match ? match[1] : 'Not Specified';
        });

        allExtractedData.push(processedData);
      }

      // Update state with extracted data
      setExtractedData(allExtractedData);
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
    <div className="insurance-quote-comparator">
      <style>
        {`
          .insurance-quote-comparator {
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
        `}
      </style>
      
      <h1>Insurance Quote Comparator</h1>
      
      
      
      <div className="section">
        <h2>Document Upload</h2>
        <div className="form-group">
          <label>Upload Insurance Policy Documents:</label>
          <input 
            type="file" 
            multiple 
            onChange={handleFileUpload} 
          />
        </div>
        <button onClick={extractData} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Extract Data from Documents'}
        </button>
        {isLoading && <div className="loader"></div>}
      </div>
      
      <div className="section">
        <h2>Basic Project Information</h2>
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
          <label>Contract Period (Months):</label>
          <input 
            type="number" 
            name="contractPeriod" 
            value={templateData.contractPeriod} 
            onChange={handleTemplateChange} 
          />
        </div>
        <div className="form-group">
          <label>Extended Maintenance Cover (Months):</label>
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
      
      {extractedData.length > 0 && (
        <div className="section">
          <h2>Quote Comparison</h2>
          <button onClick={exportToExcel}>Export to Excel</button>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Details</th>
                  {extractedData.map((data, index) => (
                    <th key={index}>{data.insurer}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Basic Project Information */}
                <tr className="highlight">
                  <td className="first-col">Job Description</td>
                  <td colSpan={extractedData.length}>{templateData.jobDescription}</td>
                </tr>
                <tr>
                  <td className="first-col">Client Name</td>
                  <td colSpan={extractedData.length}>{templateData.clientName}</td>
                </tr>
                <tr>
                  <td className="first-col">Policy Type</td>
                  <td colSpan={extractedData.length}>{templateData.policyType}</td>
                </tr>
                <tr className="highlight">
                  <td className="first-col">Period of Insurance (Months)</td>
                  <td colSpan={extractedData.length}>{templateData.contractPeriod}</td>
                </tr>
                <tr>
                  <td className="first-col">Contract Period</td>
                  <td colSpan={extractedData.length}>{templateData.contractPeriod} Months</td>
                </tr>
                <tr>
                  <td className="first-col">Ext.Maint.Cover</td>
                  <td colSpan={extractedData.length}>{templateData.extMaintCover} Months</td>
                </tr>
                <tr className="highlight">
                  <td className="first-col">Contract Value</td>
                  <td colSpan={extractedData.length}>{templateData.contractValue}</td>
                </tr>
                <tr>
                  <td className="first-col">Total Sum Insured</td>
                  <td colSpan={extractedData.length}>{templateData.totalSumInsured}</td>
                </tr>
                
                {/* Standard Coverages */}
                <tr className="highlight">
                  <td className="first-col" colSpan={extractedData.length + 1}>Standard Coverages</td>
                </tr>
                {standardCoverages.map((coverage, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? '' : 'highlight'}>
                    <td className="first-col">{coverage}</td>
                    {extractedData.map((data, dataIdx) => (
                      <td key={dataIdx}>{data.coverages[coverage] || 'Not Specified'}</td>
                    ))}
                  </tr>
                ))}
                
                {/* Add-on Covers */}
                <tr className="highlight">
                  <td className="first-col" colSpan={extractedData.length + 1}>Add-on Covers</td>
                </tr>
                {addOnCovers.map((addOn, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? '' : 'highlight'}>
                    <td className="first-col">{addOn}</td>
                    {extractedData.map((data, dataIdx) => (
                      <td key={dataIdx}>{data.addOns[addOn] || 'Not Specified'}</td>
                    ))}
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

export default InsuranceQuoteComparator;