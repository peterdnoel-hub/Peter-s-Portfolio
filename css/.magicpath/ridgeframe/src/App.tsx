import { Theme } from './settings/types';
import { RidgeframeLanding } from './components/generated/RidgeframeLanding';

let theme: Theme = 'light';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <>
      <RidgeframeLanding />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
