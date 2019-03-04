module.exports = {
  register: (req, res) => {
    //customer inputs username and password
    //checks against db to see if username is already taken
    //if it is, send "username taken"
    //if not, hash and salt password then send username and password to db
    //put user on session 
    //send session.user

    const { username, password } = req.body
    const db = req.app.get('db')


  }
}