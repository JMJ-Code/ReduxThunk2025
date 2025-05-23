import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users');

  // DEV ONLY!!! - så vi kan se at vores loading spinner funktionalitet virker 
  await pause(2000);

  return response.data;
});


//Der dannes automatisk følgende 3 properties der,tilføjes 'fetchUsers':
 
// fetchUsers.pending === 'users/fetch/pending'
// fetchUsers.fulfilled === 'users/fetch/fulfilled'
// fetchUsers.rejected === 'users/fetch/rejected'

// DEV ONLY!!!

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};


export { fetchUsers };
