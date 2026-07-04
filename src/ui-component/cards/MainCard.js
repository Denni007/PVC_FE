import React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';

const MainCard = ({ title, children }) => (
  <Card>
    <CardHeader title={title} />
    <CardContent>{children}</CardContent>
  </Card>
);

export default MainCard;
