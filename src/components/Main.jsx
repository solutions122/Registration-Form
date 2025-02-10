import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, FormControl, InputLabel, Select, MenuItem ,Link} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import Loader from './Loader';
import Header from './Header';
import Preference from './Preference'
import {generatePDF} from "./Generator"
// App.js




import './Style.css';

// const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '100%',
//       backgroundColor: '#f4f4f4',
//       textAlign: 'center',
//     },
//     textarea: {
//       width: '300px',
//       height: '100%',
//     },
//   };

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
  const personal = [
    "name",
    "age",
    "d.o.b",
    "time",
    "contact no",
    "height",
    "weight",
  ]

  const [text, setText] = useState('');
    const [storedData, setStoredData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
  
 
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
    age:'',
    "d.o.b":'',
    time:'',
    'contact no':'',
    height:'',
    weight:'',
    cast:'',
    'gender':'',
    'physical status':'',
    'marital status':'',
    'mother tongue':'',
    "languages known":'',
    star:'',
    rashi:'',
    gothra:'',
    "kula (bari)":'',
    father:'',
    mother:'',
    education:'',
    'education place':'',
    "annual income":'',
    city:'',
    country:'',
    occupation:'',
    location:'',
    "family type":'',
    "family status":'',
    "no. of brothers":'',
    "no. of sisters":'',
    }); 
  
    
  const genderOptions = ["Male", "Female"];
  const cast = [
  "Brahmin",
  "Bunts",
  "Billavas",
  "Goud Saraswat Brahmins (GSB)",
  "Mogaveera",
  "Konkani Muslims",
  "Beary",
  "Kodavas",
  "Kharvi",
  "Devadiga",
  "Kulal",
  "Acharya",
  "Daivajna Brahmin",
  "Sagara",
  "Salian",
  "Tuluva Vellalar",
  "Shetty",
  "Roman Catholic"
];
  const physicalStatusOptions = ["Normal"];
  const employe = ["Yes","No"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const fieldNames = [
    "star",
    "rashi",
    "gothra",
    "kula (bari)",
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
    const updatedFormData = { ...formData, [field]: e.target.value };
    if (field === 'd.o.b') {
      updatedFormData['age'] = calculateAge(e.target.value);
    }
    setFormData(updatedFormData);
    localStorage.setItem('keyValueData', JSON.stringify(updatedFormData));
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
  
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  };
    
    const handleAddData = () => {
      const inputData = text.trim();
      const keyValuePairs = inputData.split(",").map(pair => pair.trim());
      const data = {};
  
      keyValuePairs.forEach(pair => {
        const [key, value] = pair.split(":").map(str => str.trim());
  
        if (key && value) {
          let normalizedKey = key.toLowerCase();
  
          if (normalizedKey === "nakshatra" || normalizedKey === "star") {
            normalizedKey = "star";
          }
          if (normalizedKey === "dob" || normalizedKey === "d.o.b") {
            normalizedKey = "d.o.b";
          }
  
          if (normalizedKey === "work" || normalizedKey === "occupation") {
            normalizedKey = "occupation";
          }
  
          const normalizedValue = value || "";
  
          if (normalizedKey === 'd.o.b') {
            const dob = new Date(normalizedValue);
            const age = calculateAge(dob);
            data['age'] = age;
          }
  
          data[normalizedKey] = normalizedValue;
        }
      });
  
      const storedData = JSON.parse(localStorage.getItem('keyValueData')) || {};
      const updatedData = { ...storedData, ...data };
      localStorage.setItem('keyValueData', JSON.stringify(updatedData));
      setStoredData(updatedData);
      setFormData(updatedData);
    };

    const clearData = () => {
    const clearedFormData = {
      name: '', age: '', "d.o.b": '', time: '', 'contact no': '', height: '', weight: '', cast: '', gender: '',
      'physical status': '', 'marital status': '', 'mother tongue': '', "languages known": '', star: '', rashi: '',
      gothra: '', "kula (bari)": '', father: '', mother: '', education: '', 'education place': '', "annual income": '',
      city: '', country: '', occupation: '', location: '', "family type": '', "family status": '', "no. of brothers": '',
      "no. of sisters": ''
    };

    setFormData(clearedFormData);
    localStorage.setItem('keyValueData', JSON.stringify(clearedFormData));
  };
  
    // const handleLanguageChange = (e) => {
    //   const languages = e.target.value;
    //   setFormData({ ...formData, "languages known": languages });
    //   localStorage.setItem('keyValueData', JSON.stringify(languages)); // Save the value to localStorage
    // };

    const handleTextChange = (event) => {
        setText(event.target.value);
      };
  
    const capitalizeLabel = (label) => {
      return label.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
    };

    
  return (
    <>
      <Header />

      <Box component="main" sx={{backgroundColor:'#f4f4f4',}} >
        <br />
        <br />
        <br />
        <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
      <h1>Registration Form</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter key-value pairs (e.g. name: Jack, education: B.Com)"
        rows="5"
        cols="50"
      />
      </Box>
      <br />
      <Box sx={{display: 'flex',alignItems: 'center',justifyContent:'center',gap:"20px"}}>
      <Button onClick={handleAddData} variant="contained">
        Add
      </Button>
      <Button onClick={clearData} variant="contained" color="error">
        Remove
      </Button></Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap',gap: 2,justifyContent: 'center' , alignItems: 'center' }}>
         {personal.map((field, index) => (
                 <TextField
                   key={index}
                   label={capitalizeLabel(field)} // Capitalize label for display
                   variant="outlined"
                   name={field}
                   value={formData[field] || ""}
                   onChange={(e) => handleChange(e, field)}
                   disabled={false}
                    sx={{ width: '300px' }}
                   margin="normal"
                 />
               ))}
          <FormControl  sx={{ width: '300px' }}>
            <InputLabel>Cast</InputLabel>
            <Select
              label="Cast"
              value={formData["cast"] || ""}
              onChange={(e) => handleChange(e, "cast")}
        
            >
              {cast.map((cast, index) => (
                <MenuItem key={index} value={cast}>
                  {cast}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl  sx={{ width: '300px' }}>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              value={formData["gender"] || ""}
              onChange={(e) => handleChange(e, "gender")}
        
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
            onChange={(e) => handleChange(e, "contact number")}
            sx={{ width: '300px' }}
          />
          <FormControl  sx={{ width: '300px' }}>
            <InputLabel>Physical Status</InputLabel>
            <Select
              label="Physical Status"
              value={formData["physical status"] || ""}
              onChange={(e) => handleChange(e, "physical status")}
        
            >
              {physicalStatusOptions.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl  sx={{ width: '300px' }}>
            <InputLabel>Marital Status</InputLabel>
            <Select
              label="Marital Status"
              value={formData["marital status"] || ""}
              onChange={(e) => handleChange(e, "marital status")}
        
            >
              {maritalStatusOptions.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl  sx={{ width: '300px' }}>
            <InputLabel>Mother Tongue</InputLabel>
            <Select
              label="Mother Tongue"
              value={formData["mother tongue"] || ""}
              onChange={(e) => handleChange(e, "mother tongue")}
        
            >
              {motheToungeOptions.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl  sx={{ width: '300px' }}>
      <InputLabel>Language Known</InputLabel>
      <Select 
        multiple
        label="Language Known"
        value={formData["languages known"] || []}
        onChange={(e) =>handleChange(e, "languages known")}

      >
        {motheToungeOptions.map((status, index) => (
          <MenuItem key={index} value={status} >
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl  sx={{ width: '300px' }}>
            <InputLabel>Father</InputLabel>
            <Select
              label="Father"
              value={formData["father"] || ""}
              onChange={(e) => handleChange(e, "father")}
        
            >
              {employe.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl  sx={{ width: '300px' }}>
            <InputLabel>Mother</InputLabel>
            <Select
              label="Mother"
              value={formData["mother"] || ""}
              onChange={(e) => handleChange(e, "mother")}
        
            >
              {employe.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

{fieldNames.map((field, index) => (
  <TextField
    key={index}
    label={capitalizeLabel(field)} // Capitalize label for display
    variant="outlined"
    name={field}
    value={formData[field] || ""}
    onChange={(e) => handleChange(e, field)}
     sx={{ width: '300px' }}
    margin="normal"
  />
))}

<FormControl  sx={{ width: '300px' }}>
            <InputLabel>Employed In</InputLabel>
            <Select
              label="Employed In"
              value={formData["employed in"] || ""}
              onChange={(e) => handleChange(e, "employed in")}
        
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
           sx={{ width: '300px' }}
          margin="normal"
        />
      ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap',gap: 2,justifyContent: 'space-between' }}>
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
        <br />
        <div>
               <Button variant="contained" color="primary" onClick={generatePDF}>Download PDF</Button>
             </div>
    
      </Box>

    </>
  );
};

export default App;
