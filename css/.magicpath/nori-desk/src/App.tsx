import { Theme } from './settings/types';
import { NoriDeskLanding } from './components/generated/NoriDeskLanding';

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
      <NoriDeskLanding />
    </>
  ); // %EXPORT_STATEMENT%
}

export default App;
