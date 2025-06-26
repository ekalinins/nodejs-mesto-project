export enum ERROR_MESSAGES {
  USER_CREATE_INVALID_DATA = 'Переданы некорректные данные при создании пользователя',
  USER_NOT_EXIST = 'Запрашиваемый пользователь не найден',
  USER_PROFILE_INCORRECT_DATA = 'Переданы некорректные данные при обновлении профиля',
  USER_AVATAR_INCORRECT_DATA = 'Переданы некорректные данные при обновлении аватара.',
  USER_INCORRECT_ID = 'Некорректный ID пользователя',
  USER_INVALID_AVATAR_URL = 'Некорректный URL аватара',
  CARD_NOT_FOUND = 'Карточка с указанным _id не найдена',
  CARD_CREATE_INVALID_DATA = 'Переданы некорректные данные при создании карточки',
  CARD_INCORRECT_ID = 'Некорректный ID карточки',
  UNKNOWN_RESOURCE = 'Запрашиваемый ресурс не найден',
  INVALID_EMAIL = 'Некорректный email',
  INVALID_LOGIN_CREDENTIALS = 'Передан неверный логин или пароль',
  INTERNAL_ERROR = 'Ошибка сервера. Что то пошло не так',
}

export enum SUCCESS_MESSAGES {
  CARD_DELETED = 'Карточка успешно удалена',
}
