- use not as a component to render
```javascript
import Alert from 'pathto/component/alert';
Alert.info({
  title: 'some title',
  content: <input type='text' value={this.state.test} onChange={(e) => {
    // NOT WORKING HERE.
    // if you need to sync with the outer component state,
    // use the inline below
    console.log(this.state);
    this.setState({ test: e.target.value })
  }} />,
  cancel: ['Click to cancel', () => true],
  confirm: [<ButtonComponent />, () => {
    // return false to prevent from closing
  }]
});
```

- inline version: use as render
```javascript
import AlertComponent from 'pathto/components/alert/alert';
....
render() {
  return (
    <AlertComponent
      hidden={this.state.hidden}
      content={{
        type: '@info',
        title: 'some title',
        content: <input type='text' value={this.state.test} onChange={(e) => {
          // works
          console.log(this.state);
          this.setState({ test: e.target.value })
        }} />,
        cancel: () => true,
        confirm: () => {
        // return false to prevent from closing
        }
      }}
    />
  );
}
```
