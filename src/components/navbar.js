import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { clearUser } from '../ducks/reducer';
import { Link } from 'react-router-dom';

const drawerWidth = 60;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  overall: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  firstDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  secondDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const NavBar = props => {
  const { classes } = props;

  const logout = async () => {
    await axios.post(`/auth/logout`);
    props.clearUser();
    props.history.push('/');
  };

  return (
    <Drawer className={classes.drawer} variant="permanent" anchor="left">
      <div className={classes.overall}>
        <div className={classes.firstDiv}>
          <Link to="/allcustomers" style={{ textDecoration: 'none' }}>
            <Button>All Customers</Button>
          </Link>
          <Link to="/platecheck" style={{ textDecoration: 'none' }}>
            <Button>Plate Check</Button>
          </Link>
        </div>
        <div className={classes.secondDiv}>
          <Button onClick={() => logout()}>logout</Button>
        </div>
      </div>
    </Drawer>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => {
  return {};
};

const mapDispatchToProps = {
  clearUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
