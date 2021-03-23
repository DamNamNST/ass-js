

//start import model user
import User from '../model/usersModel';



//start add user 

export const addUser = (req,res,next) =>{
  res.json({
    name : "that is add user"
  })
}

//end add user

//start show detail userr




//start delete user 

export const deleteUser = (req,res,next) =>{
  res.json({
    name : "that is delete user"
  })
}

//end delete user

//start edit user
export const editUser = (req,res,next) =>{
  res.json({
    name : "that is edit user"
  })
}
//end edit user



//start show list user
export const showListUser = (req,res,next) =>{
  if(req.query.username){
    User.find({username :req.query.username})
      .then(user =>{
        user = user.map(user => user.toObject())
        res.json(user)
      })
      .catch(next)
  }
    else{
      User.find({})
    .then(user => {
      user = user.map(user => user.toObject())
      res.json(user)
    }
    )
    .catch(next)
    }
        
}

//end show list user
