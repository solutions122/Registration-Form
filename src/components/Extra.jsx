import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import Loader from './Loader';
import Header from './Header';
import Generator from "./Generator"
import Preference from './Preference'

import './Style.css';

const App = () => {

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

  const [text, setText] = useState('');
    const [storedData, setStoredData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    // const [languages, setLanguages] = useState(["English", "Spanish", "German", "French", "Hindi", "Chinese"]);
    // const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(storedData); // Initialize with stored data
  
    
    
  
  
    const genderOptions = ["Male", "Female"];
    const cast = ["Hindu","Shetty", "Roman Catholic"];
  const physicalStatusOptions = ["Normal"];
  const employe = ["Yes","No"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const fieldNames = [
    "star",
    "rashi",
    "gothra",
    "kula (bari)",
    "father",
    "mother",
    "education",
    "education place",
  ]
  const fieldNames2=[
    "annual income",
    "city",
    "country",
    "occupation",
    "location",
    "family type",
    "family status",
    "no. of brothers",
    "no. of sisters",
  ];
  const [showPreferences, setShowPreferences] = useState(false);

  const handleShowPreferences = () => {
    setShowPreferences(!showPreferences);
  };

  useEffect(() => {
    // Retrieve the values from localStorage when the component mounts
    const storedData = fieldNames.reduce((acc, field) => {
      acc[field] = localStorage.getItem(field) || "";
      return acc;
    }, {});
    setFormData(storedData);
  }, []);

  const handleChange = (e, field) => {
    const newValue = e.target.value;
    const keyValueData = JSON.parse(localStorage.getItem('keyValueData')) || {};
    keyValueData[field] = newValue;
    setFormData({ ...formData, [field]: newValue });
    localStorage.setItem('keyValueData', JSON.stringify(keyValueData));
  };
  const motheToungeOptions = [
     "English",  
     "Kannada",  
     "Hindi",  
     "Tulu", 
     "Konkani",  
     "Malayalam", 
     "Telugu",  
     "Marati",  
    // Add more languages as needed
  ];
  
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
      color: 'blue', // Text color for selected items
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
  
  
    
  
  
    
    // useEffect(() => {
    //   // Retrieve the languages known from localStorage when the component mounts
    //   const languagesKnown = localStorage.getItem('keyValueData') ? JSON.parse(localStorage.getItem('keyValueData')) : [];
    //   setFormData({ "languages known": languagesKnown });
    // }, []);
  
    const handleLanguageChange = (e) => {
      const languages = e.target.value;
      setFormData({ ...formData, "languages known": languages });
      localStorage.setItem('keyValueData', JSON.stringify(languages)); // Save the value to localStorage
    };

    useEffect(() => {
      // Retrieve keyValueData from localStorage when the component mounts
      const keyValueData = JSON.parse(localStorage.getItem('keyValueData')) || {};
      const dob = keyValueData['dob'] || '';
      setFormData({ ...formData, dob: dob });
    }, []);
    
    const handleDateChange = (e) => {
      const newDob = e.target.value;
      const keyValueData = JSON.parse(localStorage.getItem('keyValueData')) || {};
      keyValueData['dob'] = newDob;
      setFormData({ ...formData, dob: newDob });
      localStorage.setItem('keyValueData', JSON.stringify(keyValueData)); // Save the value to localStorage
    };
  
    const capitalizeLabel = (label) => {
      return label.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
    };



  return (
    <>
      <Header />

      <Box component="main" >
        <br />
        <br />
        <br />
        <h1>Key-Value Registration Form
          
        </h1>

        {/* Textarea for input */}
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter key-value pairs (e.g. name: Jack, education: B.Com)"
          rows="5"
          cols="50"
        />
        <br />
        <Button onClick={handleAddData} variant="contained"><AddBoxIcon /></Button>
        <Button onClick={clearData} variant="contained" color='error'><CancelIcon /></Button>

        {/* Form to display saved data */}
        <h2>Registration Form  <div style={{ marginTop: '20px' }}>
          {isEditing ? (
            <Button onClick={handleSave} variant="contained" color="success"><SaveIcon /></Button>
          ) : (
            <Button onClick={handleEdit} variant="contained"><EditIcon /></Button>
          )}
        </div></h2>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData["name"] || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
          />
          <TextField
            label="Age"
            variant="outlined"
            name="age"
            value={formData["age"] || ""}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            disabled={!isEditing}
          />
          <FormControl fullWidth>
            <InputLabel>Cast</InputLabel>
            <Select
              label="Cast"
              value={formData["cast"] || ""}
              onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
              disabled={!isEditing}
            >
              {cast.map((cast, index) => (
                <MenuItem key={index} value={cast}>
                  {cast}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
      label="D.O.B"
      variant="outlined"
      name="dob"
      value={formData.dob || ""}
      onChange={handleDateChange}
      disabled={!isEditing}
    />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              value={formData["gender"] || ""}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              disabled={!isEditing}
            >
              {genderOptions.map((gender, index) => (
                <MenuItem key={index} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Contact No"
            variant="outlined"
            name="contact no"
            value={formData["contact no"] || ""}
            onChange={(e) => setFormData({ ...formData, "contact no": e.target.value })}
            disabled={!isEditing}
          />
          <FormControl fullWidth>
            <InputLabel>Physical Status</InputLabel>
            <Select
              label="Physical Status"
              value={formData["physical status"] || ""}
              onChange={(e) => setFormData({ ...formData, "physical status": e.target.value })}
              disabled={!isEditing}
            >
              {physicalStatusOptions.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Height"
            variant="outlined"
            name="height"
            value={formData["height"] || ""}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
            disabled={!isEditing}
          />
          <TextField
            label="Weight"
            variant="outlined"
            name="weight"
            value={formData["weight"] || ""}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            disabled={!isEditing}
          />
          <FormControl fullWidth>
            <InputLabel>Marital Status</InputLabel>
            <Select
              label="Marital Status"
              value={formData["marital status"] || ""}
              onChange={(e) => setFormData({ ...formData, "marital status": e.target.value })}
              disabled={!isEditing}
            >
              {maritalStatusOptions.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Mother Tongue</InputLabel>
            <Select
              label="Mother Tongue"
              value={formData["mother tongue"] || ""}
              onChange={(e) => setFormData({ ...formData, "mother tongue": e.target.value })}
              disabled={!isEditing}
            >
              {motheToungeOptions.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
      <InputLabel>Language Known</InputLabel>
      <Select 
        multiple
        label="Language Known"
        value={formData["languages known"] || []}
        onChange={handleLanguageChange}
        disabled={!isEditing}
      >
        {motheToungeOptions.map((status, index) => (
          <MenuItem key={index} value={status} >
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <TextField
            label="Time"
            variant="outlined"
            name="time"
            value={formData["time"] || ""}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            disabled={!isEditing}
          />

{fieldNames.map((field, index) => (
  <TextField
    key={index}
    label={capitalizeLabel(field)} // Capitalize label for display
    variant="outlined"
    name={field}
    value={formData[field] || ""}
    onChange={(e) => handleChange(e, field)}
    disabled={!isEditing}
    fullWidth
    margin="normal"
  />
))}

<FormControl fullWidth>
            <InputLabel>Employed In</InputLabel>
            <Select
              label="Employed In"
              value={formData["employed in"] || ""}
              onChange={(e) => setFormData({ ...formData, "employed in": e.target.value })}
              disabled={!isEditing}
            >
              {employe.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

         {fieldNames2.map((field, index) => (
        <TextField
          key={index}
          label={capitalizeLabel(field)} // Capitalize label for display
          variant="outlined"
          name={field}
          value={field === "country" ? "India" : formData[field] || ""}
          onChange={(e) => handleChange(e, field)}
          disabled={field === "country"} // Disable editing for "country"
          fullWidth
          margin="normal"
        />
      ))}
 <div>
  
        <Button variant="contained" color="primary" onClick={handleShowPreferences}>
          {showPreferences ? 'Hide Preferences' : 'Preferences'}
        </Button>

        {showPreferences && (
          <Preference 
            formData={formData} 
            handleChange={handleChange} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
            setFormData={setFormData} 
          />
        )}
      </div>
          
        </Box>
    
        <div style={{ marginTop: '20px' }}>
          {isEditing ? (
            <Button onClick={handleSave} variant="contained" color="success"><SaveIcon /></Button>
          ) : (
            <Button onClick={handleEdit} variant="contained"><EditIcon /></Button>
          )}
        </div>
        
        {storedData && Object.keys(storedData).length === 0 ? (
          <p>No data saved yet.</p>
        ) : (
          <p>Saved data is displayed in the form fields above. Edit and save as needed!</p>
        )}

        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <Generator />
          )}
        </div>
      </Box>
    </>
  );
};

export default App;
