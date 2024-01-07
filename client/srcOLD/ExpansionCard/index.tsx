import { useTheme } from '@material-ui/core';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';
import {
  Card,
  Collapse,
  Grid,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { embedYoutubeLink, isYoutubeLink } from './utils';
import { Exposure } from '../types';

export default function ExpansionCard({
  exposure,
  isBookmarked,
  isSelected,
}: {
  exposure: Exposure;
  isBookmarked: boolean;
  isSelected: boolean;
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const singleLineHeight = theme.spacing(3);
  const doubleLineHeight = 2 * singleLineHeight;
  const [cardHovered, setCardHovered] = useState(false);

  const isYoutube = exposure.link && isYoutubeLink(exposure.link);

  return (
    <Card
      sx={{ width: '100%', px: 3, py: 2, cursor: 'pointer' }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      onClick={() => setOpen((s) => !s)}
      elevation={2}
    >
      <Grid container flexDirection="column" spacing={1}>
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
                  {exposure.name}
                </Typography>
              </Collapse>
            </Grid>
            <Grid item xs={1}>
              {!isYoutube && exposure.link && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Link href={exposure.link} target="_blank">
                    <LaunchIcon fontSize="small" color="primary" />
                  </Link>
                </IconButton>
              )}
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
            <Collapse in={open} collapsedSize={singleLineHeight}>
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
                {exposure.modifications || 'None'}
              </Typography>
            </Collapse>
          </Grid>
        </Grid>
        <Grid container item flexDirection="column" xs={12}>
          <Grid item xs={9}>
            <Typography variant="subtitle2" fontStyle="italic">
              Format(s):
            </Typography>
          </Grid>
          <Grid container item justifyContent="space-between">
            <Grid item xs={9}>
              <Typography variant="body2" noWrap={!open}>
                {exposure.formats.map((format) => format.name)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item flexDirection="row" xs={9} spacing={1}>
          {isYoutube && (
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <iframe
                  width="640"
                  height="480"
                  src={embedYoutubeLink(exposure.link)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </Grid>
            </Grid>
          )}
          {open && (
            <>
              <Grid container item flexDirection="column" xs={12} md={4}>
                <Grid item>
                  <Typography variant="subtitle2" fontStyle="italic">
                    Disorder(s):
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {exposure.disorders.map((disorder) => disorder.name)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item flexDirection="column" xs={12} md={4}>
                <Grid item>
                  <Typography variant="subtitle2" fontStyle="italic">
                    Intervention Type(s):
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {exposure.interventionTypes.map((itype) => itype.name)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item flexDirection="column" xs={12} md={4}>
                <Grid item>
                  <Typography variant="subtitle2" fontStyle="italic">
                    Appropriate for:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    {exposure.isAdultAppropriate && exposure.isChildAppropriate
                      ? 'All'
                      : exposure.isAdultAppropriate
                      ? 'Adults'
                      : 'Children'}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        <Grid
          container
          item
          alignItems="center"
          justifyContent="flex-end"
          flexWrap="nowrap"
        >
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