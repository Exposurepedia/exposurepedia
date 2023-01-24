import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  Link,
  Paper,
  Typography,
  Button,
  TextField,
  Toolbar,
} from '@mui/material';
import {
  Cancel,
  FavoriteBorder,
  Favorite,
  AddCircle,
} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation, useParams } from 'react-router-dom';
import WarningIcon from '@mui/icons-material/Warning';
import {
  updateItem,
  approveItem,
  rejectItem,
} from '../components/apis/ExposureApi';
import Popup from '../components/Popup';
import { getData, useData } from '../util/api';
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/userSlice';

interface ExposureItemProps {
  item: Item;
}

interface Item {
  name: string;
  disorders: string[];
  formats: string[];
  interventionTypes: string[];
  isChildAppropriate: boolean;
  isAdultAppropriate: boolean;
  keywords: string[];
  modifications: string;
  maturity: string[];
  link: string;
}

export default function ExposureItem() {
  const [isEdit, setIsEdit] = useState(false);
  const [liked, setLiked] = useState(false);
  const authData = useData('auth/authstatus');
  const self = useAppSelector(selectUser);
  const [popupState, setPopupState] = useState('');
  const emp: string[] = [];
  const [curItem, setCurItem] = useState({
    name: '',
    disorders: emp,
    formats: emp,
    interventionTypes: emp,
    isChildAppropriate: false,
    isAdultAppropriate: false,
    keywords: emp,
    maturity: emp,
    modifications: '',
    link: '',
  });
  const [savedItem, setSavedItem] = useState({
    name: '',
    disorders: emp,
    formats: emp,
    interventionTypes: emp,
    isChildAppropriate: false,
    isAdultAppropriate: false,
    keywords: emp,
    maturity: emp,
    modifications: '',
    link: '',
  });
  const { id } = useParams();
  const location = useLocation();

  // console.log('location: ', location.state.key);
  // const usedItem = useData(`exposure/${location.state.key}`)?.data;
  // const usedItem = useData(`exposure/639016c1bab195ab7f580ab1`)?.data;
  // console.log(usedItem);
  // setCurItem(usedItem?.data);
  // console.log(usedItem);
  const { isApprove, isBroken } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(`exposure/${id}`);
      const maturity = [];
      const disorders = res?.data[0].disorders.map((it: any) => it.name);
      const formats = res?.data[0].formats.map((it: any) => it.name);
      const interventionTypes = res?.data[0].interventionTypes.map(
        (it: any) => it.name,
      );
      const keywords = res?.data[0].keywords.map((it: any) => it.name);
      console.log(res);
      if (res?.data[0].isAdultAppropriate) {
        maturity.push({ name: 'Adult' });
      }
      if (res?.data[0].isChildAppropriate) {
        maturity.push({ name: 'Child' });
      }
      setCurItem({
        ...res?.data[0],
        disorders,
        formats,
        interventionTypes,
        keywords,
        maturity,
      });
      setSavedItem({
        ...res?.data[0],
        disorders,
        formats,
        interventionTypes,
        keywords,
        maturity,
      });
    };
    fetchData();
  }, [id]);

  const saveChanges = () => {
    setIsEdit(false);
    setSavedItem(curItem);
    const { isAdultAppropriate } = curItem;
    const { isChildAppropriate } = curItem;
    const isLinkBroken = false; // update this
    updateItem(
      id || '',
      curItem.name,
      curItem.disorders,
      curItem.formats,
      curItem.interventionTypes,
      isAdultAppropriate,
      isChildAppropriate,
      isLinkBroken,
      curItem.keywords,
      curItem.modifications,
      curItem.link,
    );
    console.log('Exposure item changes saved');
  };

  const approve = () => {
    approveItem(id || '');
  };

  const reject = () => {
    rejectItem(id || '');
  };

  const cancelChanges = () => {
    setIsEdit(false);
    setCurItem(savedItem);
    console.log('Exposure item changes cancelled');
  };

  const handleDelete = (key: string, data: string) => {
    setCurItem((prevItem) => {
      const usedKey = key as keyof Item;
      const newsavedItem: Item = JSON.parse(JSON.stringify(prevItem));
      const changedArray: any[] = prevItem[usedKey] as any[];
      return {
        ...newsavedItem,
        [usedKey]: changedArray.filter(
          (changedItem) => changedItem.name !== data && changedItem !== data,
        ),
      };
    });
  };

  return (
    <div>
      <Toolbar />
      {isApprove && (
        <div
          style={{
            width: '100%',
            background: '#f5f5f5',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
            margin: '0px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '10px 0px',
          }}
        >
          <p style={{ margin: '0px' }}>This resource is awaiting approval</p>
          <div style={{ marginTop: '10px' }}>
            <Button
              variant="outlined"
              sx={{
                maxWidth: '180px',
                height: '30px',
                borderColor: 'green',
                color: 'green',
                textTransform: 'none',
                margin: '0px 5px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.8)',
              }}
              onClick={() => approve()}
            >
              Approve Resource
            </Button>
            <Button
              variant="outlined"
              sx={{
                maxWidth: '180px',
                height: '30px',
                borderColor: 'red',
                color: 'red',
                textTransform: 'none',
                margin: '0px 5px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.8)',
              }}
              onClick={() => reject()}
            >
              Reject Resource
            </Button>
          </div>
        </div>
      )}
      {isBroken && (
        <div
          style={{
            width: '100%',
            background: '#f5f5f5',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
            margin: '0px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '10px 0px',
          }}
        >
          <p style={{ margin: '0px', display: 'flex', alignItems: 'center' }}>
            {' '}
            <WarningIcon
              sx={{
                color: '#EDDD4E',
                margin: '0px 5px',
              }}
            />{' '}
            This resource has a broken link
          </p>
          <div style={{ marginTop: '10px' }}>
            <Button
              variant="outlined"
              sx={{
                maxWidth: '180px',
                height: '30px',
                borderColor: 'green',
                color: 'green',
                textTransform: 'none',
                margin: '0px 5px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.8)',
              }}
              onClick={() => saveChanges()}
            >
              Approve Resource
            </Button>
            <Button
              variant="outlined"
              sx={{
                maxWidth: '180px',
                height: '30px',
                borderColor: 'red',
                color: 'red',
                textTransform: 'none',
                margin: '0px 5px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.8)',
              }}
              onClick={() => saveChanges()}
            >
              Reject Resource
            </Button>
          </div>
        </div>
      )}
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          margin: '1rem',
          border: '1px solid #e9e9e9',
          borderRadius: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ mr: '0.25rem' }}>
              {isEdit ? (
                <TextField
                  sx={{ width: '750px' }}
                  InputProps={{
                    style: { fontSize: '24px', fontWeight: 'bold' },
                  }}
                  id="standard-basic"
                  variant="standard"
                  onChange={(e) => {
                    setCurItem((prevItem) => ({
                      ...prevItem,
                      name: e.target.value,
                    }));
                  }}
                  defaultValue={curItem.name}
                />
              ) : (
                <strong style={{ width: '600px' }}>{curItem.name}</strong>
              )}
            </Typography>
            {liked ? (
              <Favorite
                style={{ color: 'CF0C0C' }}
                onClick={() => {
                  // TODO: update number of likes here
                  // updateItem()
                  setLiked((prevLiked) => !prevLiked);
                }}
              />
            ) : (
              <FavoriteBorder
                style={{ color: 'CF0C0C' }}
                onClick={() => setLiked((prevLiked) => !prevLiked)}
              />
            )}

            <Typography color="GrayText">0</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Typography>Last updated October 1st 2022</Typography>
            {self.admin &&
              (isEdit ? (
                <>
                  <Button
                    variant="outlined"
                    sx={{
                      maxWidth: '200px',
                      borderColor: 'green',
                      color: 'green',
                      textTransform: 'none',
                      marginTop: '10px',
                    }}
                    onClick={() => saveChanges()}
                  >
                    <span style={{ marginRight: '5px' }}>Save Changes</span>
                    <CheckIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      maxWidth: '200x',
                      borderColor: 'gray',
                      color: 'gray',
                      marginTop: '10px',
                      textTransform: 'none',
                    }}
                    onClick={() => cancelChanges()}
                  >
                    <span style={{ marginRight: '5px' }}>Cancel Changes</span>
                    <CheckIcon />
                  </Button>
                </>
              ) : (
                <Button
                  variant="outlined"
                  sx={{ maxWidth: '140px', marginTop: '10px' }}
                  onClick={() => setIsEdit(true)}
                >
                  <span style={{ marginRight: '5px' }}>Edit Item</span>
                  <EditIcon />
                </Button>
              ))}
          </Box>
        </Box>

        {[
          'disorders',
          'formats',
          'interventionTypes',
          'maturity',
          'keywords',
        ].map((key) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                my: '0.25rem',
              }}
            >
              <Typography>
                <strong>
                  {key.charAt(0).toUpperCase() + key.substring(1)}:
                </strong>{' '}
              </Typography>
              {Object(curItem)[key] &&
                Object(curItem)[key].map((data: any) => (
                  <Chip
                    sx={{
                      mx: '0.25rem',
                      background: '#397FBF',
                      color: 'white',
                      height: '30px',
                      margin: '2px',
                      '& .MuiChip-deleteIcon': {
                        color: 'rgba(237,237,237,0.9)',
                      },
                    }}
                    label={data.name || data}
                    onDelete={() => {
                      handleDelete(key, data.name || data);
                    }}
                    deleteIcon={
                      isEdit ? (
                        <Cancel sx={{ backgroundClip: 'red' }} />
                      ) : (
                        <span />
                      )
                    }
                  />
                ))}
              {isEdit && (
                <AddCircle
                  style={{ color: '009054' }}
                  onClick={() => setPopupState(key)}
                />
              )}
              {/* {popupState === key && <Popup category={key} />} */}
              {popupState === key && (
                <Popup
                  category={key}
                  setPopupState={setPopupState}
                  setCurItem={setCurItem}
                />
              )}
            </Box>
          );
        })}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            my: '0.25rem',
          }}
        >
          <Typography>
            <strong>Modifications: </strong>
            {isEdit ? (
              <TextField
                sx={{ width: '350px' }}
                InputProps={{ style: { fontSize: '16px' } }}
                id="standard-basic"
                variant="standard"
                onChange={(e) => {
                  setCurItem((prevItem) => ({
                    ...prevItem,
                    modifications: e.target.value,
                  }));
                }}
                defaultValue={curItem.modifications}
              />
            ) : (
              <span style={{ width: '500px' }}>{curItem.modifications}</span>
            )}
          </Typography>
        </Box>
        {curItem.link !== '' && (
          <div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                my: '0.25rem',
              }}
            >
              <Typography>
                <strong>Link: </strong>
                <Link href={curItem.link}>{curItem.link}</Link>
              </Typography>
            </Box>
            {curItem.link && curItem.link.includes('youtube') && (
              <iframe
                width="640"
                height="480"
                src={`https://www.youtube.com/embed/${curItem.link
                  .split('=')
                  .at(-1)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            )}
          </div>
        )}
      </Paper>
    </div>
  );
}