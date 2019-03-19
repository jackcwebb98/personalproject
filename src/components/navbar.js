import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { clearUser } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appbar: {
    height: '10%',
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  overall: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  firstDiv: {
    marginLeft: '17px',
    display: 'flex',
    flexDirection: 'space-between',
  },
  secondDiv: {
    marginRight: '30px',
    display: 'flex',
    flexDirection: 'space-between',
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
    <AppBar className={classes.appbar}>
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
    </AppBar>
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
