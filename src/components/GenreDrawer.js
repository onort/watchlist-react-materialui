import React from 'react';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


const GenreDrawer = (props) => {
  const handleClose = () => console.log('menu item click')
  const styles = {
    menu: {
      position: 'relative',
      top: '20%'
    }
  }
  return (
    <Drawer
      docked={false}
      width={200}
      open={props.open}
      onRequestChange={handleClose}
    >
      <Menu style={styles.menu}>
        <MenuItem onTouchTap={handleClose}>Menu Item</MenuItem>
        <MenuItem onTouchTap={handleClose}>Menu Item 2</MenuItem>
      </Menu>
    </Drawer>
  )
}

export default GenreDrawer