const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');
const InputError = require('../errors/InputError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.findUser = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name, about, avatar, email, password: hash,
      },
    ))
    // вернём записанные в базу данные
    .then((user) => {
      res.status(201).send(
        {
          _id: user._id,
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        },
      );
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InputError('Переданы некорректные данные при создании пользователя.'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
        return;
      }
      next(err);
    });
};

module.exports.findByIdUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      next(new NotFoundError(`Пользователь по указанному идентификатору ${req.params.userId} не найден.`));
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        next(new NotFoundError(`Пользователь по указанному идентификатору ${req.params.userId} не найден.`));
      } else if (err.name === 'CastError') {
        next(new InputError('Передан некорректный _id профиля'));
      } else next(err);
    });
};

module.exports.findByUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new NotFoundError(`Пользователь по указанному идентификатору ${req.user._id} не найден.`));
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Передан некорректный _id профиля'));
      } else next(err);
    });
};

module.exports.updateInfoByIdUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      next(new NotFoundError(`Пользователь с указанным идентификатором ${req.user._id} не найден.`));
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        next(new NotFoundError('Пользователь c указанным _id не найден'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InputError('Переданы некорректные данные при обновлении профиля'));
      } else next(err);
    });
};

module.exports.updateAvatarByIdUser = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      next(new NotFoundError(`Пользователь с указанным идентификатором ${req.user._id} не найден.`));
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        next(new NotFoundError('Пользователь c указанным _id не найден'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InputError('Переданы некорректные данные при обновлении профиля'));
      } else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: false,
      });
      // вернём токен
      res.send({ token });
    })
    .catch(() => {
      next(new AuthError('Неверно введены почта или пароль'));
    });
};

module.exports.logoff = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: false,
    secure: true,
  });
  res.status(200)
    .send({ message: 'Вы вышли из аккаунта' });
};
