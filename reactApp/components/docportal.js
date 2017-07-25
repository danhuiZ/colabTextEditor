var React = require('React');


export default class DocPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myDocs: [],
    };
  }

  render() {
    return(
      <div>
        <NewDoc />
          <h4>My Documents</h4>
            <ul>
              {this.state.myDocs.map(doc => {
                return <li key={doc._id}><a href={'/docs/'+doc._id}>{doc.title}</a></li>
              })}
            </ul>
        <AddSharedDoc />
      </div>
    );
  }

}
