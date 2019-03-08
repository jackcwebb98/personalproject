const initialState = {
  companyId: 0,
  username: '',
  businessType: '',
  companyName: '',
};

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user,
  };
}

export function clearUser() {
  console.log('cleared user');
  return {
    type: CLEAR_USER,
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      const { companyId, username, businessType, companyName } = payload;
      return { ...state, companyId, username, businessType, companyName };
    case CLEAR_USER:
      return {
        ...state,
        companyId: 0,
        username: '',
        businessType: '',
        companyName: '',
      };
    default:
      return state;
  }
}
