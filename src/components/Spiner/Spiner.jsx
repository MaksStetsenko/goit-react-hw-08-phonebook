import React from 'react';
import { LineWave } from 'react-loader-spinner';

import { Box } from 'components/Box';

export const FullscreenSpiner = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LineWave
        height={60}
        width={60}
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </Box>
  );
};

export const LocalSpiner = () => {
  return (
    <Box
      display="inline-block"
      alignItems="center"
      justifyContent="center"
      textAlign="right"
      p={3}
    >
      <LineWave
        height={40}
        width={40}
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </Box>
  );
};
