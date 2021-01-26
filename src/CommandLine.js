import { Component } from 'react';

function DropdownItem(props) {
  return (
    <li><a className="dropdown-item" href={`${props.url}?${props.param}=${props.value}`}>{props.icon} {props.name}</a></li>
  );
}

class CommandLine extends Component {
  static get SEARCH_ENGINES() {
    return [
      { name: 'Google', icon: <i className="icon-google" />, url: 'https://www.google.com/search', param: 'q' },
      { name: 'Twitter', icon: <i className="icon-twitter" />, url: 'https://twitter.com/search', param: 'q' },
      { name: 'Wikipedia', icon: <i className="icon-wikipedia" />, url: 'https://en.wikipedia.org/w/index.php', param: 'search' },
      { name: 'YouTube', icon: <i className="icon-youtube" />, url: 'https://www.youtube.com/results', param: 'search_query' },
      { name: 'PHP Manual', icon: <i className="icon-php" />, url: 'https://www.php.net/manual-lookup.php', param: 'pattern' },
      { name: 'MDN', icon: <i className="icon-mdn" />, url: 'https://developer.mozilla.org/ja/search', param: 'q' },
    ];
  }
  constructor() {
    super();
    this.state = {
      value: '',
    };
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
  }
  render() {
    const dft = CommandLine.SEARCH_ENGINES[0];
    return (
      <form className="input-group" action={dft.url} method="GET">
        <input name={dft.param} className="form-control" style={{ margin: 1 }} type="search" placeholder="Search..." onChange={e => this.handleChange(e)} value={this.state.value} autoFocus={this.props.autoFocus} />
        <div className="input-group-append">
          <div className="btn-group" role="group">
            <button className="btn btn-primary" style={{ borderRadius: 0 }} type="submit">{dft.icon}</button>
            <button id="searchEngineDropdown" type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="searchEngineDropdown">
              {CommandLine.SEARCH_ENGINES.map((props, i) => <DropdownItem key={i} value={this.state.value} {...props} />)}
            </ul>
          </div>
        </div>
      </form>
    );
  }
}

export default CommandLine;
