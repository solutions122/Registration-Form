import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';

const fieldNames = [
  "age",
  "height",
];

const maritalStatusOptions = [
  "Single",
  "Married",
  "Divorced",
  "Widowed"
];
const employed =[
  "Yes","No"
]

const motherTongueOptions = [
  "English",
  "Hindi",
  "Kannada",
  "Tamil",
  "Telugu"
];

const Propre = [
  "education",
  "occupation",
  "income"
];

const cityOptions = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix"
];

const stateOptions = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];


const casteOptions = [
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


const PreferencePage = () => {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    'marital status': '',
    'mother tongue': '',
    education:'',
    occupation:'',
    income:'',
    'employed':'',

    city: '',
    state: '',
    caste: '',
  });

  

  const capitalizeLabel = (label) => {
    return label.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
  };

  const handleChange = (e, field) => {
    const updatedFormData = {
      ...formData,
      [field]: e.target.value,
    };

    setFormData(updatedFormData);

    // Automatically save updated form data under the new key in localStorage
    localStorage.setItem('newKeyValueData', JSON.stringify(updatedFormData));
  };

  const handleClear = () => {
    const clearedFormData = {
      age: '',
      height: '',
      'marital status': '',
      'mother tongue': '',
      education:'',
      occupation:'',
      income:'',
      'employed':'',

      city: '',
      state: '',
      caste: '',
    };

    setFormData(clearedFormData);

    // Clear the data in localStorage
    localStorage.setItem('newKeyValueData', JSON.stringify(clearedFormData));
  };

  useEffect(() => {
    // Load PreferencePage data from localStorage
    const storedFormData = JSON.parse(localStorage.getItem('newKeyValueData'));
    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap',gap: 2,justifyContent: 'center' }}>
      {fieldNames.map((field, index) => (
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

      <FormControl  sx={{ width: '300px' }} margin="normal" variant="outlined">
        <InputLabel>{capitalizeLabel("marital status")}</InputLabel>
        <Select
          label={capitalizeLabel("marital status")}
          name="marital status"
          value={formData["marital status"] || ""}
          onChange={(e) => handleChange(e, "marital status")}
          disabled={false}
        >
          {maritalStatusOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl  sx={{ width: '300px' }} margin="normal" variant="outlined">
        <InputLabel>{capitalizeLabel("mother tongue")}</InputLabel>
        <Select
          label={capitalizeLabel("mother tongue")}
          name="mother tongue"
          value={formData["mother tongue"] || ""}
          onChange={(e) => handleChange(e, "mother tongue")}
          disabled={false}
        >
          {motherTongueOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {Propre.map((field, index) => (
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

<FormControl  sx={{ width: '300px' }} margin="normal" variant="outlined">
        <InputLabel>{capitalizeLabel("employed")}</InputLabel>
        <Select
          label={capitalizeLabel("employed")}
          name="employed"
          value={formData["employed"] || ""}
          onChange={(e) => handleChange(e, "employed")}
          disabled={false}
        >
          {employed.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

       <TextField
                  label="City"
                  variant="outlined"
                  name="city"
                  value={formData["city"] || ""}
                  onChange={(e) => handleChange(e, "city")}
                  sx={{ width: '300px' }}
                />

      <FormControl  sx={{ width: '300px' }} margin="normal" variant="outlined">
        <InputLabel>{capitalizeLabel("state")}</InputLabel>
        <Select
          label={capitalizeLabel("state")}
          name="state"
          value={formData["state"] || ""}
          onChange={(e) => handleChange(e, "state")}
          disabled={false}
        >
          {stateOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl  sx={{ width: '300px' }} margin="normal" variant="outlined">
        <InputLabel>{capitalizeLabel("caste")}</InputLabel>
        <Select
          label={capitalizeLabel("caste")}
          name="caste"
          value={formData["caste"] || ""}
          onChange={(e) => handleChange(e, "caste")}
          disabled={false}
        >
          {casteOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>

      <Button onClick={handleClear} variant="outlined" color="secondary">
        Clear
      </Button>
    
    
      </div>
  );
};

export default PreferencePage;
