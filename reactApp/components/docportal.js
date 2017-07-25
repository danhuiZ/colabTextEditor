var React = require('React');
import NewDoc from './newDoc';
import AddSharedDoc from './addSharedDoc';


export default class DocPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myDocs: [],
    };
  }

  // componentWillMount(){
  //    load the users documents from mongo into this.state.myDocs
  // }j

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
