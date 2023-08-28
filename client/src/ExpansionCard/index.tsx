import React, { useState } from 'react';
import {
  Card,
  Collapse,
  Fade,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTheme } from '@material-ui/core';
import LaunchIcon from '@mui/icons-material/Launch';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export default function ExpansionCard() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const singleLineHeight = theme.spacing(3);
  const doubleLineHeight = 2 * singleLineHeight;
  const [cardHovered, setCardHovered] = useState(false);

  const isBookmarked = false; // GET THIS FROM PROPS
  const isSelected = false; // GET THIS FROM PROPS

  return (
    <Card
      sx={{ width: '100%', px: 3, py: 2, cursor: 'pointer' }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      onClick={() => setOpen((s) => !s)}
    >
      <Grid container flexDirection="column" spacing={2}>
        <Grid
          container
          item
          flexWrap="nowrap"
          spacing={1}
          justifyContent="space-between"
        >
          <Grid
            item
            container
            flexWrap="nowrap"
            justifyContent="space-between"
            xs={9}
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item xs={11}>
              <Collapse in={open} collapsedSize={singleLineHeight}>
                <Typography noWrap={!open} lineHeight={`${singleLineHeight}px`}>
                  Exposure name and/or detail that can be of an indeterminate
                  length, spanning multiple rows of text or perhaps just one.
                  This is the detail of the exposure that someone might use tp
                  help a patient dealing with a disorder.
                </Typography>
              </Collapse>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <LaunchIcon fontSize="small" color="primary" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="flex-end"
            xs={1}
            flexWrap="nowrap"
            spacing={1}
          >
            <Grid item>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {isBookmarked ? (
                  <BookmarkOutlinedIcon color="primary" />
                ) : (
                  <BookmarkBorderOutlinedIcon
                    sx={{
                      visibility:
                        !isBookmarked && cardHovered ? 'visible' : 'hidden',
                    }}
                  />
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {isSelected ? (
                  <CheckBoxOutlinedIcon color="primary" />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    sx={{
                      visibility:
                        !isSelected && cardHovered ? 'visible' : 'hidden',
                    }}
                  />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item flexDirection="column" xs={9}>
          <Grid item>
            <Typography variant="subtitle2" fontStyle="italic">
              Modifications:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Collapse in={open} collapsedSize={doubleLineHeight}>
              <Typography
                variant="body2"
                sx={[
                  ...(open
                    ? []
                    : [
                        {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                          transition: theme.transitions.create('display', {
                            duration: theme.transitions.easing.easeIn,
                          }),
                        },
                      ]),
                ]}
              >
                This section will contain the applicable modifications that a
                practitioner might employ to increase or decrease difficulty of
                the exposure. This section will contain the applicable
                modifications that a practitioner might employ to increase or
                decrease difficulty of the exposure. This section will contain
                the applicable modifications that a practitioner might employ to
                increase or decrease difficulty of the exposure.
              </Typography>
            </Collapse>
          </Grid>
        </Grid>
        <Grid container item flexDirection="column" xs={12}>
          <Grid item xs={9}>
            <Typography variant="subtitle2" fontStyle="italic">
              Formats:
            </Typography>
          </Grid>
          <Grid container item justifyContent="space-between">
            <Grid item xs={9}>
              <Typography variant="body2">
                (short hand), other?, other?, etc..
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          alignItems="center"
          justifyContent={open ? 'space-between' : 'flex-end'}
          flexWrap="nowrap"
        >
          {open && (
            <Grid item container spacing={3}>
              <Grid item>
                <Typography variant="body2">item1 etc...</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">item2 etc...</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">item3 etc...</Typography>
              </Grid>
            </Grid>
          )}

          <Grid
            item
            sx={[
              ...(open
                ? []
                : [
                    {
                      mt: `-${doubleLineHeight}px`,
                      p: '0px !important',

                      transition: theme.transitions.create('margin', {
                        duration: theme.transitions.easing.easeIn,
                      }),
                    },
                  ]),
            ]}
          >
            {open ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon
                sx={{
                  visibility: !open && cardHovered ? 'visible' : 'hidden',
                }}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
