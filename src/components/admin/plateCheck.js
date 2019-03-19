import React, { Component } from 'react';
import NavBar from '../navbar';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { clearUser, updateUser } from '../../ducks/reducer';
import axios from 'axios';

const { REACT_APP_KEY_FILE } = process.env;

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
  },
  view: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    height: '60%',
    width: '60%',
  },
  trueAlert: {
    backgroundColor: '#92f78f',
  },
  falseAlert: {
    backgroundColor: theme.palette.primary.main,
  },
});

class PlateCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundCustomer: {},
      falseAlert: false,
      trueAlert: false,
      image: '',
      imageText: '',
    };
  }

  test = () => {
    console.log(REACT_APP_KEY_FILE);
  };

  componentDidMount = async () => {
    await this.getUser();
  };

  findCustomer = async () => {
    let user = {
      imageText: this.state.imageText,
      companyId: this.props.companyId,
    };

    let foundUser = await axios.post(`/api/imagecheck`, user);
    if (foundUser.data[0]) {
      this.setState({
        foundCustomer: foundUser.data[0],
        trueAlert: true,
      });
    } else {
      this.setState({
        falseAlert: true,
      });
    }
  };

  encodeImageFileAsURL = e => {
    if (!e.target.files[0]) {
      return;
    }
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        image: reader.result,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  handleGoogleSubmit = async () => {
    let image = this.state.image.replace(
      /^data:image\/(png|jpg|jpeg);base64,/,
      ''
    );

    let jsonString = {
      requests: [
        {
          image: {
            content: image,
          },
          features: [
            {
              type: 'TEXT_DETECTION',
            },
          ],
        },
      ],
    };

    try {
      let result = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${REACT_APP_KEY_FILE}`,
        jsonString
      );
      this.setState({
        imageText: result.data.responses[0].fullTextAnnotation.text,
      });
      console.log(this.state.imageText);
      this.findCustomer();
    } catch (err) {
      console.log(err);
    }
  };

  getUser = async () => {
    const { companyId } = this.props;
    if (!companyId) {
      try {
        let res = await axios.get(`/api/current`);
        this.props.updateUser({
          companyId: res.data.company_id,
          username: res.data.admin_username,
          businessType: res.data.business_type,
          companyName: res.data.company_name,
        });
      } catch (err) {
        this.props.history.push('/');
      }
    }
  };

  handleInput = (prop, val) => {
    this.setState({
      [prop]: val,
    });
  };

  handleDialog = (prop, val) => {
    this.setState({
      [prop]: val,
    });
  };

  handleClose = () => {
    this.setState({
      trueAlert: false,
      falseAlert: false,
      foundCustomer: {},
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar history={this.props.history} />
        <div className={classes.view}>
          <Dialog open={this.state.trueAlert} onClose={this.handleClose}>
            <DialogTitle className={classes.trueAlert}>
              {'Customer Found'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Customer Name: {this.state.foundCustomer.real_name}
              </DialogContentText>
              <DialogContentText>
                Car Make: {this.state.foundCustomer.car_make}
              </DialogContentText>
              <DialogContentText>
                Plate Number: {this.state.foundCustomer.plate_number}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Dialog open={this.state.falseAlert} onClose={this.handleClose}>
            <DialogTitle className={classes.falseAlert}>
              {'No Customer Found'}
            </DialogTitle>
          </Dialog>
          <Paper className={classes.paper}>
            <TextField
              label="License Plate Number"
              onChange={e => this.handleInput('imageText', e.target.value)}
            />
            <Button onClick={this.findCustomer} variant="outlined">
              submit
            </Button>
            <Input
              type="file"
              accept="image/*"
              onChange={e => this.encodeImageFileAsURL(e)}
            />
            <Button onClick={this.handleGoogleSubmit} variant="outlined">
              Check Image
            </Button>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    companyId: reduxState.companyId,
    username: reduxState.username,
    companyName: reduxState.companyName,
    businessType: reduxState.businessType,
  };
};

const mapDispatchToProps = {
  updateUser,
  clearUser,
};

PlateCheck.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PlateCheck));
