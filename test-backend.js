import axios from 'axios';

const testBackend = async () => {
  try {
    console.log('Testing backend signup endpoint...');
    
    const testData = {
      email: "test@example.com",
      password: "123",
      fullName: "Test User",
      image: "https://example.com/avatar.jpg" // URL plus courte
    };

    const response = await axios.post('http://localhost:3333/signup', testData, {
      withCredentials: true, // Ajout de withCredentials pour la gestion des sessions
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Backend Response:', response.data);
    console.log('Status:', response.status);
    console.log('Test successful!');
  } catch (error) {
    console.error('Backend Error Details:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data);
    console.error('Full error:', error);
  }
};

testBackend();