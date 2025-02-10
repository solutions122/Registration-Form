import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import jsPDF from 'jspdf'

// import './App.css';

export const generatePDF = () => {
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const topMargin = 70;
  const midX = pageWidth / 2; // Center of the page
  const leftMargin = 2; 

  // Draw Border
  doc.setDrawColor(0);
  doc.setLineWidth(0);
  doc.rect(leftMargin, topMargin, pageWidth - 5, pageHeight - topMargin - 10);

  // Draw Vertical Line
  doc.line(midX, topMargin, midX, pageHeight - 10);

  // Add Images (ensure paths are correct or use base64 encoded images)
  const imgPath1 = '/img1.jpg'; // Path to your first image
  const imgPath2 = '/img2.jpg'; // Path to your second image
  doc.addImage(imgPath1, 'JPEG', pageWidth / 26 - 8, 1, 210, 40);
  doc.addImage(imgPath2, 'JPEG', pageWidth / 26 - 8, 40, 210, 20);

  // Add current registration date
  const regDate = "REGISTRATION DATE: " + new Date().toLocaleDateString();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(regDate, pageWidth - 90, topMargin + -2);

  let y = topMargin + 10;

// Fetch data from localStorage (Ensure data has been stored in localStorage)
// const storedData = JSON.parse(localStorage.getItem('keyValueData')) || {};

// Personal Details Section
const storedData = JSON.parse(localStorage.getItem('keyValueData')) || {}; // Use consistent key
console.log('Retrieved Data:', storedData); // Debug: Print the retrieved data

const personalFields = [
  "name", "age", "cast", "d.o.b", "gender", "physical status", "contact no", "height", "weight",
  "marital status", "mother tongue", "languages known", "time"
];

// Add "PERSONAL DETAILS" section heading just once before the loop
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.text("PERSONAL DETAILS", 4, y);
y += 8;

// Add each field in the personal details section with wrapping
personalFields.forEach(field => {
  let fieldValue = storedData[field.toLowerCase()] || ''; // Fetch from localStorage, default to empty string

  // If the field is "physical status", set its value to "NORMAL" if it's empty
  if (field.toLowerCase() === "physical status" && !fieldValue) {
    fieldValue = "NORMAL";
  }

  console.log(`${field}: ${fieldValue}`); // Debug: Print each field and its value

  const text = `• ${field.toUpperCase()} : ${fieldValue ? fieldValue.toString().toUpperCase() : ''}`;
  const wrappedText = doc.splitTextToSize(text, midX - 10); // Wrap text to fit within the page width
  wrappedText.forEach(line => {
    doc.setFontSize(10);
    doc.text(line, 8, y);
    y += 8;
  });
});





  const religion = [
    "star", 
    "rashi", 
    "gothra", 
    "kula (bari)", 
  ];

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("RELIGIOUS INFORMATION ", 4, y);
  y += 8;

  religion.forEach(field => {
    let fieldValue = storedData[field.toLowerCase()] || ''; // Fetch from localStorage, default to empty string

    const text = `• ${field.toUpperCase()} : ${fieldValue.toUpperCase() || ''}`;
    const wrappedText = doc.splitTextToSize(text, pageWidth - 40); // Wrap text to fit within the page width
    wrappedText.forEach(line => {
      doc.setFontSize(10);
      doc.text(line, 8, y);
      y += 8;
    });
  });

  const parents = [
    "father", 
    "mother", 
  ];

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("PARENTS INFORMATION ", 4, y);
  y += 8;

  parents.forEach(field => {
    let fieldValue = storedData[field.toLowerCase()] || ''; // Fetch from localStorage, default to empty string

    const text = `• ${field.toUpperCase()} : ${fieldValue.toUpperCase() || ''}`;
    const wrappedText = doc.splitTextToSize(text, pageWidth - 40); // Wrap text to fit within the page width
    wrappedText.forEach(line => {
      doc.setFontSize(10);
      doc.text(line, 8, y);
      y += 8;
    });
  });

  const marriage = [
    "children's", 
    "any", 
  ];
  let y2 = topMargin + 0;
  y2 += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("SECOND MARRIAGE INFORMATION  ", midX + 2, y2);
  y2 += 8;

  marriage.forEach(field => {
    let fieldValue = storedData[field.toLowerCase()] || ''; // Fetch from localStorage, default to empty string

  

    const text = `• ${field.toUpperCase()} : ${fieldValue.toUpperCase() || ''}`;
    const wrappedText = doc.splitTextToSize(text, pageWidth - midX - 20); // Wrap text for the second column
    wrappedText.forEach(line => {
      doc.setFontSize(10);
      doc.text(line, midX + 6, y2);
      y2 += 8;
    });
  });

  // Handle professional information, habits, family info with wrapping
  const profession = [
    "education", 
    "education place", 
    "employed in",
    "annual income",
    "city",
    "country",
    "occupation",
    "location"
  ];

  y2 += 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("PROFESSIONAL INFORMATION", midX + 2, y2);
  y2 += 8;
  
  profession.forEach(field => {
    let fieldValue = storedData[field.toLowerCase()] || ''; // Fetch from localStorage, default to empty string
    if (field.toLowerCase() === "country" && !fieldValue) {
      fieldValue = "INDIA";
    }
  
    const text = `• ${field.toUpperCase()} : ${fieldValue.toUpperCase() || ''}`;
    const wrappedText = doc.splitTextToSize(text, pageWidth - midX - 20); // Wrap text for the second column
    wrappedText.forEach(line => {
      doc.setFontSize(10);
      doc.text(line, midX + 6, y2);
      y2 += 8;
    });
  });

  const habits = [
    "drinking", 
    "smoking", 
    "eating",
  ];
  y2 += 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("HABITS ", midX + 2, y2);
  y2 += 8;

  habits.forEach(field => {
    let fieldValue = storedData[field.toLowerCase()] || ''; // Fetch from localStorage, default to empty string
    if ((field.toLowerCase() === "drinking" || field.toLowerCase() === "smoking" || field.toLowerCase() === "eating" ) && !fieldValue) {
      fieldValue = "NO";
    }

    const text = `• ${field.toUpperCase()} : ${fieldValue.toUpperCase() || ''}`;
    const wrappedText = doc.splitTextToSize(text, pageWidth - midX - 20); // Wrap text for the second column
    wrappedText.forEach(line => {
      doc.setFontSize(10);
      doc.text(line, midX + 6, y2);
      y2 += 8;
    });
  });

  const family = [
    "family type", 
    "family status", 
    "no. of brothers",
    "no. of sisters",
  ];

  y2 += 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("FAMILY INFORMATION   ", midX + 2, y2);
  y2 += 8;

  family.forEach(field => {
    let fieldValue = storedData[field.toLowerCase()] || ''; // Fetch from localStorage, default to empty string

    const text = `• ${field.toUpperCase()} : ${fieldValue.toUpperCase() || ''}`;
    const wrappedText = doc.splitTextToSize(text, pageWidth - midX - 20); // Wrap text for the second column
    wrappedText.forEach(line => {
      doc.setFontSize(10);
      doc.text(line, midX + 6, y2);
      y2 += 8;
    });
  });
  doc.addPage();
  y = 10;

  // const oldStoredData = JSON.parse(localStorage.getItem('keyValueData')) || {};/
  const newstoredData = JSON.parse(localStorage.getItem('newKeyValueData')) || {};

const partnerpre = [
  "age", 
  "height", 
  "marital status", 
  "mother tongue", 
];

y += 10;
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.text("PARTNER'S PREFERENCE", 8, y);
y += 8;

partnerpre.forEach(field => {
  let fieldValue = newstoredData[field] || ''; // Fetch from newKeyValueData, default to empty string

  const text = `• ${field.toUpperCase()} : ${fieldValue.toUpperCase() || ''}`;
  const wrappedText = doc.splitTextToSize(text, pageWidth - 40); // Wrap text to fit within the page width
  wrappedText.forEach(line => {
    doc.setFontSize(10);
    doc.text(line, 12, y);
    y += 8;
  });
});

  const professionpre = [
    "education",  
    "employed",
    "occupation",
    "income",
  ];

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("PROFESSIONAL PREFERENCE ", 8, y);
  y += 8;

  professionpre.forEach(field => {
    let fieldValue = newstoredData[field.toLowerCase()] || ''; // Fetch from localStorage, default to empty string

    const text = `• ${field.toUpperCase()} : ${fieldValue.toUpperCase() || ''}`;
    const wrappedText = doc.splitTextToSize(text, pageWidth - 40); // Wrap text to fit within the page width
    wrappedText.forEach(line => {
      doc.setFontSize(10);
      doc.text(line, 12, y);
      y += 8;
    });
  });

  const locationpre = [
    "city",  
    "state",
    "caste",
  ];

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("LOCATION PREFERENCE ", 8, y);
  y += 8;

  locationpre.forEach(field => {
    let fieldValue = newstoredData[field.toLowerCase()] || ''; // Fetch from localStorage, default to empty string

    const text = `• ${field.toUpperCase()} : ${fieldValue.toUpperCase() || ''}`;
    const wrappedText = doc.splitTextToSize(text, pageWidth - 40); // Wrap text to fit within the page width
    wrappedText.forEach(line => {
      doc.setFontSize(10);
      doc.text(line, 12, y);
      y += 8;
    });
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("HOBBIES ", 8, y);
  y += 8;

  y += 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("All The Information I Have Given Here Is Correct If The Information I Have Given Is Wrong I ", 8, y);
  y += 5;
  doc.text("Will Be Liable For All The Punishment Given By This Institution ", 8, y);
  
  




const name = storedData["name"] || "Unknown_Name";  // Use "Unknown_Name" if name is not available
const cast = storedData["cast"] || "Unknown_Cast";  // Use "Unknown_Cast" if caste is not available

// Create filename using name and caste
const fileName = `${name}_${cast}_biodata.pdf`;


  // Save the PDF
  doc.save(fileName);
  
};


function App() {
  const [text, setText] = useState('');
    const [storedData, setStoredData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    // const [languages, setLanguages] = useState(["English", "Spanish", "German", "French", "Hindi", "Chinese"]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(storedData); // Initialize with stored data

    // const handleLanguageChange = (e) => {
    //   const selected = Array.from(e.target.selectedOptions, option => option.value);
    //   setSelectedLanguages(selected);
    
    // };

   

  return (
    <div>
    <Button onClick={generatePDF}>Generate PDF</Button>
  </div>
  );
}


  export default App;
