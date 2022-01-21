import React from 'react';
// Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях.
const CurrentUserContext = React.createContext({
   // name: "Andrue"
});

export default CurrentUserContext;