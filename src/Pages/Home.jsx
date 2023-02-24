import { Divider, Paper, Typography } from '@mui/material';
import Section from 'components/Section';
import React from 'react';

export const Home = () => {
  return (
    <Section>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h3" component="h1">
          The Phonebook
        </Typography>
        <Typography variant="subtitle1" component="p" mb={2}>
          It`s Phonebook use a fake backend so don't add real user contacts to
          the database!
        </Typography>
        <Divider />
        <Typography variant="body1" component="p" mt={2} mb={1}>
          How to start? Just register or log in.
        </Typography>
        <Typography variant="h6" component="h3">
          Technologies:
        </Typography>
        <Typography variant="subtitle2" component="p" mb={4}>
          React, Redux, RTK query, React Hook Form, Material UI.
        </Typography>
      </Paper>
    </Section>
  );
};
