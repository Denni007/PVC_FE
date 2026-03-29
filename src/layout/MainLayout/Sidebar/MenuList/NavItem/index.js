// import PropTypes from 'prop-types';
// import React from 'react';
// import { Link } from 'react-router-dom';

// // material-ui
// // import { useTheme } from '@mui/material/styles';
// import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// // third party
// import { useSelector } from 'react-redux';

// // project import
// // import * as actionTypes from 'store/actions';

// // assets
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// // ==============================|| NAV ITEM ||============================== //

// const NavItem = ({ item, level }) => {
//   // const theme = useTheme();
//   const customization = useSelector((state) => state.customization);
//   // const menuOpen = useSelector((state) => state.open);
//   // const dispatch = useDispatch();
//   const Icon = item.icon;
//   const itemIcon = item.icon ? (
//     <Icon color="secondary" />
//   ) : (
//     <ArrowForwardIcon color="secondary" fontSize={level > 0 ? 'secondary' : 'secondary'} />
//   );

//   let itemTarget = '';
//   if (item.target) {
//     itemTarget = '_blank';
//   }
//   let listItemProps = { component: Link, to: item.url, onclick: item.onClick };
//   if (item.external) {
//     listItemProps = { component: 'a', href: item.url, onclick: item.onClick };
//   }
//   // const handleCloseDrawer = () => {
//   //   // console.log('enter');
//   //   // drawerToggle();
//   //   // menuOpen.open;
//   //   // console.log('customization.isOpen ', customization);
//   //   console.log('customization.isOpen ', menuOpen.open);
//   //   dispatch({ type: actionTypes.MENU_CLOSE });
//   //   console.log('actionTypes.MENU_CLOSE', actionTypes.MENU_CLOSE);
//   // };
//   return (
//     <ListItemButton
//       disabled={item.disabled}
//       sx={{
//         ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' }),
//         borderRadius: '5px',
//         marginBottom: '5px',
//         pl: `${level * 16}px`
//       }}
//       selected={customization.isOpen === item.id}
//       component={Link}
//       onClick={item.onClick}
//       to={item.url}
//       target={itemTarget}
//       {...listItemProps}
//     >
//       <ListItemIcon sx={{ minWidth: 25 }}>{itemIcon}</ListItemIcon>
//       <ListItemText
//         primary={
//           <Typography sx={{ pl: 1.4 }} variant={customization.isOpen === item.id ? 'subtitle2' : 'body1'} color="secondary">
//             {item.title}
//           </Typography>
//         }
//         secondary={
//           item.caption && (
//             <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption, pl: 200 }} display="block" gutterBottom>
//               {item.caption}
//             </Typography>
//           )
//         }
//       />
//       {item.chip && (
//         <Chip
//           color={item.chip.color}
//           variant={item.chip.variant}
//           size={item.chip.size}
//           label={item.chip.label}
//           avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
//         />
//       )}
//     </ListItemButton>
//   );
// };

// NavItem.propTypes = {
//   item: PropTypes.object,
//   level: PropTypes.number,
//   // drawerToggle: PropTypes.func,
//   icon: PropTypes.object,
//   target: PropTypes.object,
//   url: PropTypes.string,
//   disabled: PropTypes.bool,
//   id: PropTypes.string,
//   title: PropTypes.string,
//   caption: PropTypes.string,
//   chip: PropTypes.object,
//   color: PropTypes.string,
//   label: PropTypes.string,
//   avatar: PropTypes.object
// };

// export default NavItem;
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from 'react-redux';

// ==============================|| NAV ITEM ||============================== //

const NavItem = ({ item, level }) => {
  const customization = useSelector((state) => state.customization);
  const Icon = item.icon;
  const itemIcon = Icon ? <Icon color="secondary" /> : <ArrowForwardIcon color="secondary" />;

  // Determine if the ListItemButton should be a link or a button
  const isExternal = item.external || !item.url;
  const isLink = !isExternal;

  const handleClick = () => {
    console.log(item.onClick, 'item.onClick');

    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <ListItemButton
      disabled={item.disabled}
      sx={{
        ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' }),
        borderRadius: '5px',
        marginBottom: '5px',
        pl: `${level * 16}px`
      }}
      selected={customization.isOpen === item.id}
      component={isLink ? Link : 'button'} // Use Link if URL is provided, otherwise button
      onClick={handleClick} // Handle click action
      to={isLink ? item.url : undefined} // Set URL only if using Link
      href={isExternal ? item.url : undefined} // Set href only if external
      target={isExternal ? '_blank' : undefined} // Set target only if external
    >
      <ListItemIcon sx={{ minWidth: 25 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography sx={{ pl: 1.4 }} variant={customization.isOpen === item.id ? 'subtitle2' : 'body1'} color="secondary">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption, pl: 200 }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.elementType,
    url: PropTypes.string,
    onClick: PropTypes.func,
    external: PropTypes.bool,
    disabled: PropTypes.bool,
    caption: PropTypes.string,
    chip: PropTypes.shape({
      color: PropTypes.string,
      variant: PropTypes.string,
      size: PropTypes.string,
      label: PropTypes.string,
      avatar: PropTypes.node
    })
  }).isRequired,
  level: PropTypes.number.isRequired
};

export default NavItem;
