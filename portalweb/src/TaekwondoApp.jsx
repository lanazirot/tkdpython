import { AppRouter } from './router/AppRouter';
import store from "./store";
import { Provider } from "react-redux";
export const TaekwondoApp = () => {
  return (
    <Provider store={store}>
        <AppRouter />
    </Provider>
  );
}