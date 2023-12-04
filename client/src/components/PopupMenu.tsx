import { Menu, MenuItem, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

type MenuItem = {
  Icon?: ({ sx }: { sx?: SxProps<Theme> }) => JSX.Element;
  text: JSX.Element | string;
  id: string;
};

export const PopupMenu = ({
  onSelect,
  children,
  menuItems,
}: {
  onSelect: (type: string) => void;
  children: (
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  ) => React.ReactNode;
  menuItems: MenuItem[];
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {children(handleClick)}

      <Menu
        anchorEl={anchorEl}
        disablePortal
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        MenuListProps={{
          sx: (theme) => ({
            minWidth: theme.spacing(20),
          }),
        }}
      >
        {menuItems.map(({ id, Icon, text }) => (
          <span key={id}>
            <MenuItem
              key={JSON.stringify(id)}
              onClick={() => {
                onSelect(id);
                handleClose();
              }}
            >
              {Icon && (
                <Icon
                  sx={(theme) => ({
                    marginRight: theme.spacing(2),
                    color: theme.palette.text.secondary,
                    verticalAlign: 'middle',
                    display: 'inline-flex',
                  })}
                />
              )}
              <Typography variant="body2">{text}</Typography>
            </MenuItem>
          </span>
        ))}
      </Menu>
    </>
  );
};
