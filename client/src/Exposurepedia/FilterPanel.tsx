import {
  AccordionSummary,
  Drawer,
  Toolbar,
  Typography,
  Accordion,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/system';
import React from 'react';
import SearchComponent from './SearchComponent';

export default function FilterPanel() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 400,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 400,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: '22px',
            background: '#00538E',
            height: '60px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '15px',
          }}
        >
          Filters
        </Typography>

        <AccordionSummary>Disorders</AccordionSummary>
        <SearchComponent
          search=""
          name=""
          handleChange={(value) => {
            // handleSearchChange(value);
            console.log('value', value);
          }}
        />

        <Accordion
          elevation={0}
          sx={{
            '&:before': {
              backgroundColor: 'transparent !important',
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Format
          </AccordionSummary>
        </Accordion>

        <Accordion
          elevation={0}
          sx={{
            '&:before': {
              backgroundColor: 'transparent !important',
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Intervention Type
          </AccordionSummary>
        </Accordion>

        <Accordion
          elevation={0}
          sx={{
            '&:before': {
              backgroundColor: 'transparent !important',
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Appropriate For
          </AccordionSummary>
        </Accordion>
      </Box>
    </Drawer>
  );
}
