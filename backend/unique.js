const array1 = [
    'paediatric',
    'dermatologist',
    'surgery',
    'medicine',
    'psychiatrist',
    'ophthalmologist',
    'ENT',
    'pulmonologist',
    'orthopaedic',
    'gyanecologist',
    'neurologist'
  ];
  
  const array2 = [
    undefined, 'dermatologist', 'paediatric', 'surgery', 'medicine', 'neurologist', 'dentist',
    'ENT', 'endocrinologist', 'gastroentrologist', 'urologist', 'orthopaedic', 'sexologist',
    'gyanecologist', 'psychiatry'
  ];
  
  const array3 = [
    undefined, 'neurologist', 'pulmonologist', 'cardiologist', 'oncologist', 'sexologist',
    'gyanecologist', 'endocrinologist', 'orthopaedic', 'ENT'
  ];
  
  // Combine arrays into a single array
  const combinedArray = [...array1, ...array2, ...array3];
  
  // Create a set to get unique values
  const uniqueSet = new Set(combinedArray);
  
  // Convert set back to an array if needed
  const uniqueArray = Array.from(uniqueSet);
  
  // Output the result
  console.log(uniqueArray);
  