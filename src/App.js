import 'bootswatch/dist/slate/bootstrap.min.css';
import styles from './App.module.css';
import CommandLine from './CommandLine';
import ContentEditable from 'react-contenteditable';

function App() {
  return (
    <div className={styles.container}>
      <h1 className="display-3">Browxin</h1>
      <p className="lead"><ContentEditable html="Browse in cross-platform!" /></p>
      <CommandLine />
    </div>
  );
}

export default App;
