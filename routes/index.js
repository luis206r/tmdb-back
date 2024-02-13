const express = require("express");
const router = express.Router();
const { User } = require("../db/models");
const { Favorites } = require("../db/models");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middleware/auth");
const { compareObj } = require("../utils/compareObj");
const envs = require("../config/envs");
const sendCode = require("../config/mailer");
//const { UNSAFE_useScrollRestoration } = require("react-router-dom");

/*
  ALL YOUR ROUTES HERE!
*/
router.get("/", (req, res) => {
  res.send("hello");
});

router.put("/user/sendcode", (req, res) => {
  const { userMail } = req.body;
  sendCode(userMail)
    .then((obj) => {
      res.status(200).send(obj.code);
    })
    .catch((error) => {
      res.status(500).send(error);
    })
})

router.put("/user/changepassword", (req, res) => {

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      const prevPass = user.password;
      user.update({
        password: req.body.password
      })
        .then((updatedUser) => {
          if (updatedUser.password == prevPass) {
            return res.status(200).send("You must be set a new password")
          }
          else {
            return res.status(200).send(updatedUser);
          }
        })

    })
})

router.get("/apikeys", (req, res) => {
  res.status(200).send({ api_key: envs.TMDB_API_KEY, api_token: envs.TMDB_API_TOKEN })
})

router.post("/register", function (req, res, next) {
  //const { email, lastname, name, password} = req.body;
  User.create(req.body)
    .then((createdUser) => {
      res.status(200).send(createdUser);
    })
    .catch(next);
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email },
  }).then((user) => {
    if (!user) {
      return res.send(401);
    }
    user.validatePassword(password).then((isValidate) => {
      if (!isValidate) {
        res.send(401);
      } else { 
        //const payload = [user.email, user.name, user.lastname];
        const payload = {
          email: user.email,
          name: user.name,
          lastname: user.lastname,
        };
        const token = generateToken(payload);
        //res.cookie("token", token);
        res.status(200).send({user:{ user_id: user.id, ...payload }, token:token});
      }
    });
  });
});

router.get("/secret", validateAuth, (req, res) => {
  // const token = req.cookies.token;
  // const { payload } = validateToken(token);
  // res.send(payload);
  res.send({
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
  });
});

router.get("/me", validateAuth, (req, res) => {
  User.findOne({
    where: req.user
  }).then((foundUser) => {
    res.status(200).send({ user_id: foundUser.id, ...req.user });
  })

});

router.post("/logout", (req, res) => {
  res.clearCookie('token')
  return res.sendStatus(200);
});

router.get("/allusers", (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
})

router.get("/allusers/search/:value", (req, res) => {
  User.findUsers(req.params.value)
    .then((users) => {
      res.status(200).send(users);
    })
})

router.get("/user/:id", (req, res) => {
  User.findOne({ where: req.params })
    .then((user) => {
      res.status(200).send(user);
    })
})

router.post("/addfavorites/:userId", (req, res, next) => {
  User.findByPk(req.params.userId).then((user) => {
    Favorites.findOrCreate({
      //bug cuando la api cambia la data
      where: req.body,
    }).then(([createdFavoriteMovie, wasCreatedBool]) => {
      user.addFavorites(createdFavoriteMovie);
      res.status(201).send(createdFavoriteMovie.dataValues);
    });
  });
});

router.get("/userfavorites/:userId", (req, res) => {
  User.findByPk(req.params.userId)
    .then((user) => { return user.getFavorites() })
    .then((favoritesList) => res.status(200).send(favoritesList))
})

router.post("/removefavorites/:userId", (req, res) => {
  User.findByPk(req.params.userId)
    .then((user) => {
      Favorites.findOne({ //ENVIAR TYPE Y TYPE ID
        where: req.body
      })
        .then((foundFavorite) => {
          return user.removeFavorites(foundFavorite);
        })
        .then((val) => res.sendStatus(200))
    })
})

// Don´t modify this route, keep it at the bottom.
router.use("/", function (req, res) {
  res.sendStatus(404);
});
module.exports = router;
