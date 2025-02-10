import React, { useState, useEffect } from 'react';
import Select from "react-select";
import {TextField,Button, Card} from "@mui/material/"
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Loader from './Loader'
import Header from './Header';
import Generator from "./Generator"
import Toolbar from '@mui/material/Toolbar';
import './Style.css';

const tableStyle = {
  width: '40%',
  borderCollapse: 'collapse',
  margin: '0 auto',  // This centers the table horizontally
};

const cellStyle = {
  border: '1px solid black',
  padding: '4px',
  textAlign: 'left',
};

// Optionally, if you're using a parent container to center the table vertically, use this:
const parentStyle = {
  display: 'flex',
  justifyContent: 'center',  // Centers the table horizontally
  alignItems: 'center',      // Centers the table vertically
  height: '100vh',           // Makes sure it occupies full height
};


// Define predefined keys for various categories
const personal = [
  "name", "age", "cast", "d.o.b", "gender", "physical status", "contact no", "height", "weight",
  "marital status", "mother tongue", "languages known", "time"
];

const religion = [
  "star", 
  "rashi", 
  "gothra", 
  "kula (bari)", 
];

const parents = [
  "father", 
  "mother", 
];

const marriage = [
  "children's", 
  "any", 
];

const profession = [
  "EDUCATION", "EDUCATION PLACE", "EMPLOYED IN","ANNUAL INCOME","CITY","COUNTRY","OCCUPATION","LOCATION",
];

const habits = [
  "drinking", 
  "smoking", 
  "eating",
];

const family = [
  "family type", 
  "family status", 
  "no. of brothers",
  "no. of sisters",
];

const allKeys = [
  ...personal,
  ...religion,
  ...parents,
  ...marriage,
  ...profession,
  ...habits,
  ...family,
];

const languageOptions = [
  { value: "English", label: "English " },
  { value: "Kannada", label: "Kannada " },
  { value: "Hindi", label: "Hindi " },
  { value: "Tulu", label: "Tulu " },
  { value: "Konkani", label: "Konkani " },
  { value: "Malayalam", label: "Malayalam " },
  { value: "Telugu", label: "Telegu " },
  { value: "Marati", label: "Marati " },
  // Add more languages as needed
];

function App() {
  const [text, setText] = useState('');
  const [storedData, setStoredData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  // const [languages, setLanguages] = useState(["English", "Spanish", "German", "French", "Hindi", "Chinese"]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(storedData); // Initialize with stored data

  
  


  const genderOptions = ["Male", "Female"];
const physicalStatusOptions = ["Normal"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];

const customStyles = {
  // Custom style for the dropdown control
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white', // Set control background to white
    borderColor: '#ccc', // Optional: Custom border color
  }),

  // Custom style for the dropdown menu
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white', // Set menu background to white
    zIndex: 9999, // Ensure the dropdown appears on top of other elements
  }),

  // Custom style for each option
  option: (provided) => ({
    ...provided,
    backgroundColor: 'white', // Set option background to white
    color: 'black', // Set text color to black
    '&:hover': {
      backgroundColor: '#f0f0f0', // Option hover effect (light gray)
    }
  }),

  // Optional: Customize the selected option styles
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#e0e0e0', // Set background color for selected items
    color: 'black', // Text color for selected items
  }),

  // Optional: Customize the clear button style
  clearIndicator: (provided) => ({
    ...provided,
    color: 'black', // Color of the clear (X) button
  }),
};




  const calculateAge = (dob) => {
    const today = new Date();
    const birthYear = new Date(dob).getFullYear();
    
    // Calculate the age based on the year difference only
    const age = today.getFullYear() - birthYear;
  
    return age;
  };
  
  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('keyValueData')) || {};
    setStoredData(savedData);
  }, []);

  // Handle textarea input change
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Function to process input and store key-value pairs
  const handleAddData = () => {
    // Retrieve the input from the textarea
    const inputData = text.trim(); // You can replace textareaValue with the variable holding your textarea value
  
    // Split input by commas and process each entry like 'key: value'
    const keyValuePairs = inputData.split(",").map(pair => pair.trim());
    const data = {};
  
    // Process each key-value pair and store it in localStorage
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split(":").map(str => str.trim());
  
      if (key && value) {
        let normalizedKey = key.toLowerCase(); // Normalize the key to lowercase

        if (normalizedKey === "nakshatra"|| normalizedKey === "star") {
          normalizedKey = "star";
        }

        if (normalizedKey === "work" || normalizedKey === "occupation") {
          normalizedKey = "occupation";  // Normalize both to "occupation"
        }

        
        const normalizedValue = value || ""; // If no value is entered, set it as empty string

        if (normalizedKey === 'd.o.b') {
          const dob = new Date(normalizedValue);
          const age = calculateAge(dob); // Calculate age
          data['age'] = age; // Store calculated age in local storage
        }
  
        data[normalizedKey] = normalizedValue; // Store data in the object
      }
    });
  
    // Get any existing data from localStorage and merge with new data
    const storedData = JSON.parse(localStorage.getItem('keyValueData')) || {};
  
    // Merge the new data with the existing data
    const updatedData = { ...storedData, ...data };
  
    // Save the updated data back to localStorage
    localStorage.setItem('keyValueData', JSON.stringify(updatedData));
  
    // Update the state to trigger a re-render
    setStoredData(updatedData);
  
    // Optionally, update the UI or give feedback to the user
    alert('Data added to localStorage');
  };
  
  

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(storedData); // Set formData to storedData when editing starts
  };
  
  // Function to save edited data
  const handleSave = () => {
    const updatedData = { ...formData }; // Use the current formData state for the updated data
    
    // Store updated data in localStorage
    localStorage.setItem('keyValueData', JSON.stringify(updatedData));
    
    // Update the storedData state
    setStoredData(updatedData);
    
    // Switch off editing mode
    setIsEditing(false);
  };
  
  
  

  const clearData = () => {
    localStorage.removeItem('keyValueData'); // Clear localStorage
    setStoredData({}); // Clear state
    setText(''); // Reset textarea
  };


  


  
  const handleLanguageChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedLanguages(selected);
  
  };

  

  return (
<>
    <Header/>

    <Box component="main" sx={{ p: 3 ,backgroundColor: '#F6E8B1' }}>
        <Toolbar />
        
     
    <div className="App">
      <h1>Registration Form</h1>
  
      {/* Textarea for input */}
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter key-value pairs (e.g. name: Jack, education: B.Com)"
        rows="5"
        cols="50"
      />
  
      {/* Add Button */}
      <br />
      
      <Button onClick={handleAddData} variant="contained" ><AddBoxIcon /></Button>
      <br />
      <Button onClick={clearData} variant="contained" color='error'><CancelIcon /></Button>

      <Box component="main" sx={{ p: 3 ,backgroundColor: '#FEFBEA' }}>
      <h2>Data Saved</h2>
      
  
      {/* Edit and Save Buttons */}
      <div style={{ marginBottom: '10px' }}>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
     
      
      {Object.keys(storedData).length === 0 ? (
        <p>No data saved yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Key</th>
              <th style={cellStyle}>Value</th>
            </tr>
          </thead>
          <tbody>
            {allKeys.map((key, index) => {
              // Normalize the key for both storage and rendering
              const normalizedKey = key.toLowerCase();
  
              return (
                <tr key={index}>
                  <td style={cellStyle}>{key}</td>
                  <td style={cellStyle}>
                    {isEditing ? (
                      // Render dropdowns for specific keys
                      normalizedKey === "gender" ? (
                        <select
                          className="edit-input"
                          name={normalizedKey}
                          defaultValue={storedData[normalizedKey] || ""}
                        >
                          {genderOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        
                      ) : normalizedKey === "physical status" ? (
                        <select
                          className="edit-input"
                          name={normalizedKey}
                          defaultValue={storedData[normalizedKey] || ""}
                        >
                          {physicalStatusOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : normalizedKey === "marital status" ? (
                        <select
                          className="edit-input"
                          
                        >
                          {maritalStatusOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) :normalizedKey === "languages known" ? (
                        <Select
                          isMulti
                          options={languageOptions}
                          value={selectedLanguages}
                          onChange={setSelectedLanguages}
                          placeholder="Select languages"
                          closeMenuOnSelect={false} // Keep dropdown open after selection
                          styles={customStyles} 
                        />
                      ) : !isEditing && normalizedKey === "languages known" && Array.isArray(storedData[normalizedKey]) ? (
                        storedData[normalizedKey].join(" ,")
                      ) :  (
                        <TextField
                         id="outlined-basic"
                          label={key}
                          variant="outlined"
                          className="edit-input"
                          name={normalizedKey}
                          value={formData[normalizedKey] || ""}
                          disabled={!isEditing} // Control the value with formData state
                          onChange={(e) => {
                          setFormData({
                           ...formData,
                            [normalizedKey]: e.target.value, // Update specific key in state
                             });
                               }}
                        />
                        
                      )
                    ) : (
                      storedData[normalizedKey] || "" // Display empty string if no value
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      )}
      <div>
      {isLoading ? (
        <Loader /> 
      ) : (
        <Generator/>
      )}
    </div>
  </Box>
      {/* Edit and Save Buttons at bottom */}
      <div style={{
    position: 'fixed',
    bottom: '10px',   // 10px from the bottom of the screen
    right: '10px',    // 10px from the right of the screen
    zIndex: '999',    // Ensure it stays above other content
    marginTop: '10px',
    
  }}>
        {isEditing ? (
          <Button onClick={handleSave} variant="contained" color="success"><SaveIcon style={{ fontSize: '100px' }}/></Button>
        ) : (
          <Button onClick={handleEdit}variant="contained"><EditIcon style={{ fontSize: '100px' }}/></Button>
        )}
      </div>
  
      <br />
     
    </div>
    
    </Box>
    </>
  );
  
}

export default App;
